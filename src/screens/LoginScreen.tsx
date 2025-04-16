import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../utils/auth";

type FormData = {
  email: string;
  password: string;
};

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler(data: FormData) {
    setIsAuthenticating(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <LoginForm loginHandler={loginHandler} />;
}
export default LoginScreen;
