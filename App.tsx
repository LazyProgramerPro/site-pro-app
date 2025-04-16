import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import store from "./src/redux/store";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme/theme";

export default function App() {
  const isDark = useColorScheme() === "dark"; // Tự nhận biết dark mode hệ thống
  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
      <StatusBar style="auto" />

      <Provider store={store}>
        <Root />
      </Provider>
    </PaperProvider>
  );
}
