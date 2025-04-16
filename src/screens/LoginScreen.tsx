import { useState } from "react";
import { Alert } from "react-native";
import LoginForm from "../components/auth/LoginForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authenticate } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import ScreenWrapper from "../components/ui/ScreenWrapper";

type FormData = {
  email: string;
  password: string;
};

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useAppDispatch();

  async function loginHandler(data: FormData) {
    setIsAuthenticating(true);
    try {
      const token = "ThuongDev";

      dispatch(authenticate(token));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ScreenWrapper>
      <LoginForm loginHandler={loginHandler} />
    </ScreenWrapper>
  );
}
export default LoginScreen;
