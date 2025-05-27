// src/services/auth-service.ts
import { saveAuth } from "../redux/slices/authSlice";
import store from "../redux/store";
import http from "../utils/http";
import { tokenService } from "./token-service";

/**
 * Service xử lý các thao tác liên quan đến authentication
 */
class AuthService {
  /**
   * Lấy access token hiện tại từ Redux store
   * @returns string | null
   */
  getAccessToken(): string | null {
    return store.getState().auth.token;
  }

  /**
   * Kiểm tra user có đang đăng nhập không
   */
  isAuthenticated(): boolean {
    return store.getState().auth.isAuthenticated;
  }

  /**
   * Kiểm tra token có hợp lệ không (chưa hết hạn)
   */
  isTokenValid(): boolean {
    const { token, expiresAt } = store.getState().auth;
    if (!token || !expiresAt) return false;
    return Date.now() < expiresAt;
  }

  /**
   * Khởi tạo auth service khi app start
   * Kiểm tra và refresh token nếu cần
   */
  async initialize(): Promise<void> {
    const { token, refreshToken } = store.getState().auth;

    if (!token || !refreshToken) {
      return;
    }

    // Nếu access token hết hạn nhưng refresh token còn hạn
    if (!this.isTokenValid() && tokenService.isRefreshTokenValid()) {
      console.log("🔄 Access token expired on app start, refreshing...");
      await tokenService.refreshAccessToken();
    }

    // Khởi tạo token service
    tokenService.initialize();
  }
}

export const authService = new AuthService();
