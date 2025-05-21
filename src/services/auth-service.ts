// src/services/auth-service.ts
import { saveAuth } from "../redux/slices/authSlice";
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
 * Service xử lý các thao tác liên quan đến authentication
 */
class AuthService {
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
}

export const authService = new AuthService();
