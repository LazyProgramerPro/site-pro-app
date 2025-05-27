// src/services/token-service.ts
import store from "../redux/store";
import { logout, saveAuth } from "../redux/slices/authSlice";
import http from "../utils/http";

/**
 * Response từ API refresh token theo format của backend
 */
interface ApiResponse<T> {
  rc: {
    code: number;
    desc: string;
  };
  auth: T;
}

interface RefreshTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

type RefreshTokenResponse = ApiResponse<RefreshTokenData>;

/**
 * Service quản lý token authentication với auto refresh
 */
class TokenService {
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  /**
   * Lấy access token hiện tại từ Redux store
   */
  getAccessToken(): string | null {
    return store.getState().auth.token;
  }

  /**
   * Lấy refresh token hiện tại từ Redux store
   */
  getRefreshToken(): string | null {
    return store.getState().auth.refreshToken;
  }

  /**
   * Kiểm tra access token có hết hạn không
   */
  isAccessTokenExpired(): boolean {
    const { expiresAt } = store.getState().auth;
    if (!expiresAt) return true;
    return Date.now() >= expiresAt;
  }

  /**
   * Kiểm tra access token có sắp hết hạn không (buffer = 60s)
   */
  isAccessTokenExpiringSoon(bufferSeconds = 60): boolean {
    const { expiresAt } = store.getState().auth;
    if (!expiresAt) return true;
    return Date.now() + bufferSeconds * 1000 >= expiresAt;
  }

  /**
   * Kiểm tra refresh token có còn hạn sử dụng không
   */
  isRefreshTokenValid(): boolean {
    const { refreshExpiresAt } = store.getState().auth;
    if (!refreshExpiresAt) return false;
    return Date.now() < refreshExpiresAt;
  }

  /**
   * Setup timer tự động refresh token trước khi hết hạn
   */
  setupAutoRefresh(): void {
    this.clearAutoRefresh();

    const { expiresAt } = store.getState().auth;
    if (!expiresAt) return;

    // Tính thời gian còn lại đến khi cần refresh (trước 60s)
    const bufferMs = 60 * 1000; // 60 giây buffer
    const refreshTime = expiresAt - Date.now() - bufferMs;

    if (refreshTime > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshAccessToken();
      }, refreshTime);

      console.log(
        `🔄 Auto refresh scheduled in ${Math.round(refreshTime / 1000)}s`
      );
    } else {
      // Token đã hết hạn hoặc sắp hết hạn, refresh ngay
      this.refreshAccessToken();
    }
  }

  /**
   * Hủy timer auto refresh
   */
  clearAutoRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Refresh access token
   * @returns Promise<boolean> - true nếu refresh thành công
   */
  async refreshAccessToken(): Promise<boolean> {
    // Nếu đang refresh, trả về promise hiện tại
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    // Kiểm tra refresh token còn hạn không
    if (!this.isRefreshTokenValid()) {
      console.log("🔴 Refresh token expired, redirecting to login");
      this.forceLogout();
      return false;
    }

    this.isRefreshing = true;

    this.refreshPromise = this.performRefresh();
    const result = await this.refreshPromise;

    this.isRefreshing = false;
    this.refreshPromise = null;

    return result;
  }
  /**
   * Thực hiện refresh token
   */
  private async performRefresh(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      console.log("🔄 Refreshing access token...");

      const response: RefreshTokenResponse = await http.post(
        "/auth/user/refresh-token",
        {
          token: refreshToken,
        }
      );

      console.log("🔄 Refresh token response:", response);

      // Kiểm tra response code
      if (response.rc.code !== 0) {
        throw new Error(`API Error: ${response.rc.desc}`);
      }

      // Lấy data từ auth object
      const authData = response.auth;
      if (!authData.access_token || !authData.refresh_token) {
        throw new Error("Invalid response: missing tokens");
      }

      // Tính thời gian hết hạn mới
      const now = Date.now();
      const expiresAt = now + authData.expires_in * 1000;
      const refreshExpiresAt = now + authData.refresh_expires_in * 1000;

      // Cập nhật token mới vào Redux
      await store.dispatch(
        saveAuth({
          token: authData.access_token,
          refreshToken: authData.refresh_token,
          expiresAt,
          refreshExpiresAt,
          user: store.getState().auth.user, // Giữ nguyên user hiện tại
        })
      );

      console.log("✅ Token refreshed successfully");

      // Setup timer cho lần refresh tiếp theo
      this.setupAutoRefresh();

      return true;
    } catch (error) {
      console.error("❌ Failed to refresh token:", error);

      // Nếu refresh thất bại, có thể do refresh token hết hạn
      this.forceLogout();
      return false;
    }
  }

  /**
   * Bắt buộc logout user
   */
  private forceLogout(): void {
    this.clearAutoRefresh();
    store.dispatch(logout());
  }

  /**
   * Khởi tạo token service khi app start
   */
  initialize(): void {
    const { token, refreshExpiresAt } = store.getState().auth;

    if (!token) return;

    // Kiểm tra refresh token còn hạn không
    if (!this.isRefreshTokenValid()) {
      console.log("🔴 Refresh token expired on init, logging out");
      this.forceLogout();
      return;
    }

    // Nếu access token đã hết hạn, refresh ngay
    if (this.isAccessTokenExpired()) {
      console.log("🔄 Access token expired on init, refreshing...");
      this.refreshAccessToken();
    } else {
      // Setup auto refresh
      this.setupAutoRefresh();
    }
  }

  /**
   * Cleanup khi app unmount
   */
  cleanup(): void {
    this.clearAutoRefresh();
  }
}

export const tokenService = new TokenService();
