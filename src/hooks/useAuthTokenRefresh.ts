// src/hooks/useAuthTokenRefresh.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { tokenService } from "../services/token-service";

/**
 * Hook quản lý auto refresh token
 * - Khởi tạo token service khi mount
 * - Setup auto refresh timer khi token thay đổi
 * - Cleanup khi unmount
 */
export const useAuthTokenRefresh = () => {
  const { token, expiresAt, refreshExpiresAt, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Khởi tạo token service khi component mount
  useEffect(() => {
    if (isAuthenticated) {
      tokenService.initialize();
    }

    // Cleanup khi unmount
    return () => {
      tokenService.cleanup();
    };
  }, [isAuthenticated]);

  // Setup lại auto refresh khi token hoặc thời gian hết hạn thay đổi
  useEffect(() => {
    if (isAuthenticated && token && expiresAt) {
      tokenService.setupAutoRefresh();
    }
  }, [token, expiresAt, isAuthenticated]);

  return {
    isAccessTokenExpired: tokenService.isAccessTokenExpired(),
    isRefreshTokenValid: tokenService.isRefreshTokenValid(),
    refreshAccessToken: () => tokenService.refreshAccessToken(),
  };
};
