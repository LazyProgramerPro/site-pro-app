import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import store from "./src/redux/store";
import { darkTheme, lightTheme } from "./src/theme/theme";
import { useAuthTokenRefresh } from "./src/hooks/useAuthTokenRefresh";
import { useEffect } from "react";
import { authService } from "./src/services/auth-service";

// Component wrapper để sử dụng hooks bên trong Provider
function AppContent() {
  // Hook quản lý auto refresh token
  useAuthTokenRefresh();

  // Khởi tạo auth service khi app start
  useEffect(() => {
    authService.initialize();
  }, []);

  return <Root />;
}

export default function App() {
  const isDark = useColorScheme() === "dark"; // Tự nhận biết dark mode hệ thống
  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <StatusBar style="auto" />
        <Provider store={store}>
          <AppContent />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
