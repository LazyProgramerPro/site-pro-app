import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
} from "react-native-paper";
import { GlobalStyles } from "../constants/styles";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: GlobalStyles.colors.primary600,
    onPrimary: GlobalStyles.colors.white,
    primaryContainer: GlobalStyles.colors.primary100,
    onPrimaryContainer: GlobalStyles.colors.primary900,

    secondary: GlobalStyles.colors.primary200,
    onSecondary: GlobalStyles.colors.black,
    secondaryContainer: GlobalStyles.colors.primary50,
    onSecondaryContainer: GlobalStyles.colors.primary800,

    background: GlobalStyles.colors.white,
    onBackground: GlobalStyles.colors.black,

    surface: GlobalStyles.colors.gray100,
    onSurface: GlobalStyles.colors.black,

    error: GlobalStyles.colors.red600,
    onError: GlobalStyles.colors.white,

    outline: GlobalStyles.colors.gray400,
    shadow: GlobalStyles.colors.black,

    elevation: {
      level0: "transparent",
      level1: GlobalStyles.colors.gray100,
      level2: GlobalStyles.colors.gray200,
      level3: GlobalStyles.colors.gray300,
      level4: GlobalStyles.colors.gray400,
      level5: GlobalStyles.colors.gray500,
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: GlobalStyles.colors.primary400,
    onPrimary: GlobalStyles.colors.white,
    primaryContainer: GlobalStyles.colors.primary900,
    onPrimaryContainer: GlobalStyles.colors.primary100,

    secondary: GlobalStyles.colors.primary700,
    onSecondary: GlobalStyles.colors.white,
    secondaryContainer: GlobalStyles.colors.primary800,
    onSecondaryContainer: GlobalStyles.colors.primary50,

    background: GlobalStyles.colors.black,
    onBackground: GlobalStyles.colors.white,

    surface: GlobalStyles.colors.gray800,
    onSurface: GlobalStyles.colors.white,

    error: GlobalStyles.colors.red400,
    onError: GlobalStyles.colors.white,

    outline: GlobalStyles.colors.gray500,
    shadow: GlobalStyles.colors.black,

    elevation: {
      level0: "transparent",
      level1: GlobalStyles.colors.gray800,
      level2: GlobalStyles.colors.gray700,
      level3: GlobalStyles.colors.gray600,
      level4: GlobalStyles.colors.gray500,
      level5: GlobalStyles.colors.gray400,
    },
  },
};
