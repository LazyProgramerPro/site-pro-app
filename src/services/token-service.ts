// src/services/token-service.ts
import { logout, saveAuth } from "../redux/slices/authSlice";
import store from "../redux/store";
import http from "../utils/http";

/**
 * Định nghĩa response khi refresh token
 */
interface RefreshTokenResponse {
  rc: number;
  auth: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type?: string;
  };
}

/**
 * Service quản lý token authentication
 */
class TokenService {
  private tokenRefreshInterval: NodeJS.Timeout | null = null;
  private isRefreshing: boolean = false; // Chống race condition

  /**
   * Refresh access token sử dụng refresh_token hiện tại
   * @returns Promise<RefreshTokenResponse>
   */
  async refreshAccessToken(): Promise<RefreshTokenResponse> {
    if (this.isRefreshing)
      return Promise.reject(new Error("Đang refresh token"));
    this.isRefreshing = true;
    try {
      const state = store.getState();
      const { refreshToken, user } = state.auth;

      if (!refreshToken) throw new Error("Không có refresh token");

      // Gọi API refresh token
      const response = await http.post<RefreshTokenResponse>(
        "/auth/user/refresh-token",
        { token: refreshToken }
      );

      // Kiểm tra và lưu token mới vào Redux store
      if (response?.auth?.access_token) {
        const { access_token, refresh_token, expires_in } = response.auth;
        const expiresAt = Date.now() + expires_in * 1000;

        store.dispatch(
          saveAuth({
            token: access_token,
            refreshToken: refresh_token,
            expiresAt,
            user,
          })
        );
      }
      return response;
    } catch (err) {
      this.isRefreshing = false; // Đảm bảo reset flag khi lỗi
      throw err;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Kiểm tra token có sắp hết hạn không
   * @param bufferTime ms - mặc định 5 phút
   * @returns boolean
   */
  isTokenExpiringSoon(bufferTime = 5 * 60 * 1000): boolean {
    const { expiresAt } = store.getState().auth;
    if (!expiresAt) return true;
    return Date.now() + bufferTime > expiresAt;
  }

  /**
   * Lấy access token hiện tại từ Redux store
   * @returns string | null
   */
  getAccessToken(): string | null {
    return store.getState().auth.token;
  }

  /**
   * Thiết lập cơ chế refresh token tự động định kỳ
   * Hàm này nên được gọi khi user đăng nhập hoặc khi ứng dụng khởi động với token đã có sẵn
   */
  setupTokenRefresh(): void {
    this.clearTokenRefresh();
    const { expiresAt, refreshToken } = store.getState().auth;
    if (!expiresAt || !refreshToken) return; // Không còn refreshToken thì không setup

    // Nếu token đã hết hạn thì logout ngay
    if (Date.now() > expiresAt) {
      store.dispatch(logout());
      return;
    }

    // Tính toán thời gian còn lại trước khi token hết hạn (trừ buffer 5 phút)
    const timeUntilRefresh = Math.max(
      0,
      expiresAt - Date.now() - 5 * 60 * 1000
    );

    // Thiết lập timeout để refresh token khi gần hết hạn
    this.tokenRefreshInterval = setTimeout(() => {
      const { refreshToken: currentRefreshToken } = store.getState().auth;
      if (!currentRefreshToken) return; // Đã logout, không refresh nữa

      // Nếu đang refresh, không gọi tiếp, chỉ thử lại sau 1 phút
      if (this.isRefreshing) {
        setTimeout(() => this.setupTokenRefresh(), 60 * 1000);
        return;
      }

      if (this.isTokenExpiringSoon()) {
        this.refreshAccessToken()
          .then(() => {
            this.setupTokenRefresh();
          })
          .catch((error) => {
            console.error("Lỗi khi tự động refresh token:", error);
            if (error.response?.status === 401) {
              store.dispatch(logout());
            } else {
              setTimeout(() => this.setupTokenRefresh(), 60 * 1000);
            }
          });
      } else {
        this.setupTokenRefresh();
      }
    }, timeUntilRefresh);
  }

  /**
   * Hủy cơ chế tự động refresh token
   * Nên được gọi khi user logout
   */
  clearTokenRefresh(): void {
    if (this.tokenRefreshInterval) {
      clearTimeout(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
    }
    this.isRefreshing = false; // Reset flag khi clear
  }
}

export const tokenService = new TokenService();
