// src/services/token-service.ts
import store from "../redux/store";

/**
 * Service quản lý token authentication
 */
class TokenService {
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

export const tokenService = new TokenService();
