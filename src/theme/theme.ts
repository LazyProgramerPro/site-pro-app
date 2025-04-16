import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
} from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E88E5", // Xanh kỹ sư
    onPrimary: "#FFFFFF",

    secondary: "#FFC107", // Vàng cảnh báo
    onSecondary: "#000000",

    background: "#F5F5F5", // Xám xi măng nhạt
    onBackground: "#212121",

    surface: "#FFFFFF", // Bề mặt
    onSurface: "#212121",

    error: "#D32F2F",
    onError: "#FFFFFF",

    // Optional bổ sung nếu bạn dùng những key này:
    outline: "#B0BEC5",
    elevation: {
      level0: "transparent",
      level1: "#E0E0E0",
      level2: "#D6D6D6",
      level3: "#CCCCCC",
      level4: "#C2C2C2",
      level5: "#B8B8B8",
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#1976D2", // Xanh kỹ sư sáng
    onPrimary: "#000000",

    secondary: "#FFD54F", // Vàng nhẹ
    onSecondary: "#000000",

    background: "#121212", // Tối kỹ thuật
    onBackground: "#E0E0E0",

    surface: "#1E1E1E",
    onSurface: "#E0E0E0",

    error: "#EF9A9A",
    onError: "#000000",

    outline: "#B0BEC5",
    elevation: {
      level0: "transparent",
      level1: "#1E1E1E",
      level2: "#2A2A2A",
      level3: "#333333",
      level4: "#3D3D3D",
      level5: "#474747",
    },
  },
};
