const blue = {
  primary50: "#E3F2FD",
  primary100: "#BBDEFB",
  primary200: "#90CAF9",
  primary300: "#64B5F6",
  primary400: "#42A5F5",
  primary500: "#2196F3",
  primary600: "#1E88E5", // <-- màu chủ đạo
  primary700: "#1976D2",
  primary800: "#1565C0",
  primary900: "#0D47A1",
};

const neutral = {
  white: "#ffffff",
  black: "#000000",
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
};

const error = {
  red50: "#FFEBEE",
  red100: "#FFCDD2",
  red200: "#EF9A9A",
  red400: "#EF5350",
  red500: "#F44336",
  red600: "#E53935",
};

export const GlobalStyles = {
  colors: {
    ...blue,
    ...neutral,
    ...error,
    primary50: "#E3F2FD",
    primary100: "#BBDEFB",
    primary200: "#90CAF9",
    primary300: "#64B5F6",
    primary400: "#42A5F5",
    primary500: "#2196F3",
    primary600: "#1E88E5",
    primary700: "#1976D2",
    primary800: "#1565C0",
    primary900: "#0D47A1",
    gray500: "#9E9E9E",
    gray700: "#616161",

    error100: "#FFCDD2",
    error500: "#F44336",

    // Added for consistency with react-native-paper theme
    surface: neutral.white,
    primary: blue.primary600,
    primaryContainer: blue.primary50,
    onSurface: neutral.gray900,
    onSurfaceVariant: neutral.gray700,
    inverseSurface: neutral.gray800, // Example for snackbar
    outlineVariant: neutral.gray300, // Added outlineVariant
  },
  spacing: {
    xxs: 4, // Extra extra small
    xs: 6, // Extra small
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const STATUS_COLORS = {
  STATUS: {
    COMPLETED: {
      BACKGROUND: "#e8f5e9", // Có thể giữ nguyên hoặc thêm màu xanh lá vào GlobalStyles
      TEXT: "#2e7d32", // Có thể giữ nguyên hoặc thêm màu xanh lá vào GlobalStyles
    },
    IN_PROGRESS: {
      BACKGROUND: "#fff3e0", // Có thể giữ nguyên hoặc thêm màu cam vào GlobalStyles
      TEXT: "#f57c00", // Có thể giữ nguyên hoặc thêm màu cam vào GlobalStyles
    },
    NOT_STARTED: {
      BACKGROUND: GlobalStyles.colors.red50, // "#FFEBEE"
      TEXT: GlobalStyles.colors.red500, // "#F44336"
    },
    PENDING: {
      BACKGROUND: "#fffde7", // Light Yellow
      TEXT: "#fbc02d", // Yellow
    },
    REJECTED: {
      BACKGROUND: GlobalStyles.colors.gray200, // Light Gray
      TEXT: GlobalStyles.colors.gray700, // Dark Gray
    },
  },
  ICON: {
    DEFAULT: GlobalStyles.colors.gray600, // "#757575"
    SELECTED: GlobalStyles.colors.primary500, // "#2196F3"
    EMPTY: GlobalStyles.colors.gray400, // "#BDBDBD"
  },
  TEXT: {
    PRIMARY: GlobalStyles.colors.gray600, // "#757575"
    SECONDARY: GlobalStyles.colors.gray500, // "#9E9E9E"
  },
} as const;
