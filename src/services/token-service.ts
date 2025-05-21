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

  /**
   * Refresh access token sử dụng refresh_token hiện tại
   * @returns Promise<RefreshTokenResponse>
   */
  async refreshAccessToken(): Promise<RefreshTokenResponse> {
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
    // Hủy interval cũ nếu có
    this.clearTokenRefresh();

    const { expiresAt } = store.getState().auth;
    if (!expiresAt) return;

    // Tính toán thời gian còn lại trước khi token hết hạn (trừ buffer 5 phút)
    const timeUntilRefresh = Math.max(
      0,
      expiresAt - Date.now() - 5 * 60 * 1000
    );

    // Thiết lập timeout để refresh token khi gần hết hạn
    this.tokenRefreshInterval = setTimeout(() => {
      // Kiểm tra lại xem token có còn cần refresh không
      if (this.isTokenExpiringSoon()) {
        this.refreshAccessToken()
          .then(() => {
            // Sau khi refresh thành công, thiết lập lại chu kỳ refresh mới
            this.setupTokenRefresh();
          })
          .catch((error) => {
            console.error("Lỗi khi tự động refresh token:", error);
            // Nếu refresh thất bại, có thể logout hoặc thử lại sau
            if (error.response?.status === 401) {
              store.dispatch(logout());
            } else {
              // Thử lại sau 1 phút nếu lỗi không phải do token không hợp lệ
              setTimeout(() => this.setupTokenRefresh(), 60 * 1000);
            }
          });
      } else {
        // Nếu token đã được refresh bởi một request khác, thiết lập lại chu kỳ mới
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
  }
}

export const tokenService = new TokenService();
