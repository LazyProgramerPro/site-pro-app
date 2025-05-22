import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import CustomSnackbar from "../components/ui/CustomSnackbar";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { authenticate } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import http from "../utils/http";

type FormData = {
  username: string;
  password: string;
};

type SnackbarType = "success" | "error" | "info" | "warning";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    visible: false,
    message: "",
    type: "info" as SnackbarType,
  });
  // Lưu trữ thông tin đăng nhập để hiển thị lại khi đăng nhập thất bại
  const [lastLoginData, setLastLoginData] = useState<FormData | null>(null);
  const dispatch = useAppDispatch();

  const showSnackbar = (message: string, type: SnackbarType) => {
    // Đảm bảo Snackbar ẩn đi trước khi hiển thị lại
    setSnackbarConfig((prev) => ({ ...prev, visible: false }));

    // Timeout nhỏ để đảm bảo animation ẩn đi hoàn thành trước khi hiển thị lại
    setTimeout(() => {
      setSnackbarConfig({
        visible: true,
        message,
        type,
      });
    }, 100);
  };

  const hideSnackbar = () => {
    setSnackbarConfig((prev) => ({ ...prev, visible: false }));
  };

  async function loginHandler(data: FormData) {
    // Lưu lại thông tin đăng nhập để có thể sử dụng lại nếu thất bại
    setLastLoginData(data);
    setIsAuthenticating(true);
    try {
      const { rc, auth, info } = await http.post("/login", data);

      console.log("Login response:", rc, auth, info);
      if (rc?.code !== 0) {
        showSnackbar(rc?.desc || "Đăng nhập thất bại!", "error");
        return;
      }
      const { access_token, refresh_token, expires_in, refresh_expires_in } =
        auth;
      const { username, is_active } = info;

      if (!is_active) {
        showSnackbar("Tài khoản của bạn đã bị khóa!", "error");
        return;
      }

      // Chuẩn bị dữ liệu người dùng trong một đối tượng duy nhất
      const userData = {
        access_token,
        token: access_token,
        refresh_token,
        expires_in,
        refresh_expires_in,
        token_created_at: new Date().toISOString(),
        refresh_token_created_at: new Date().toISOString(),
        username,
        is_active,
      }; // Đăng nhập thành công - redirect ngay và hiển thị Snackbar
      dispatch(authenticate(userData));
      // ĐÃ CÓ auto refresh token qua useAuthTokenRefresh ở App.tsx, KHÔNG cần gọi setupTokenRefresh thủ công ở đây
      showSnackbar("Đăng nhập thành công!", "success");
    } catch (error) {
      console.error("Login error:", error);
      showSnackbar(
        "Không thể đăng nhập. Vui lòng kiểm tra thông tin tài khoản hoặc thử lại sau!",
        "error"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return (
      <LoadingOverlay
        message="Đang đăng nhập..."
        spinnerColor="#1976D2"
        showLogo={true}
      />
    );
  }
  return (
    <ScreenWrapper>
      <LoginForm
        loginHandler={loginHandler}
        initialValues={lastLoginData || undefined}
      />
      <CustomSnackbar
        visible={snackbarConfig.visible}
        message={snackbarConfig.message}
        type={snackbarConfig.type}
        onDismiss={hideSnackbar}
      />
    </ScreenWrapper>
  );
}

export default LoginScreen;
