// src/services/auth-service.ts
import { saveAuth } from "../redux/slices/authSlice";
import store from "../redux/store";
import http from "../utils/http";

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
}

export const authService = new AuthService();
