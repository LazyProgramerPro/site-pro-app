import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { tokenService } from "../services/token-service";

/**
 * Hook tự động thiết lập/cancel auto refresh token khi login/logout hoặc app khởi động lại
 */
export const useAuthTokenRefresh = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const expiresAt = useAppSelector((state) => state.auth.expiresAt);

  useEffect(() => {
    if (isAuthenticated && expiresAt) {
      // Thiết lập auto refresh token
      tokenService.setupTokenRefresh();
    } else {
      // Clear timer khi logout
      tokenService.clearTokenRefresh();
    }
    // Cleanup khi unmount
    return () => {
      tokenService.clearTokenRefresh();
    };
  }, [isAuthenticated, expiresAt]);
};
