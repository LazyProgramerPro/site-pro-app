export const GlobalStyles = {
  colors: {
    primary100: "#E3F2FD",
    primary500: "#64B5F6",
    primary700: "#1976D2",
    primary800: "#1565C0",
    gray500: "#9E9E9E",
    gray700: "#424242",
    error100: "#fcdcbf",
    error500: "#f37c13",
    iconActive: "#FFFFFF",
    iconInactive: "#CFD8DC",
  },
};

export const STATUS_COLORS = {
  STATUS: {
    COMPLETED: {
      BACKGROUND: "#e8f5e9",
      TEXT: "#2e7d32",
    },
    IN_PROGRESS: {
      BACKGROUND: "#fff3e0",
      TEXT: "#f57c00",
    },
    NOT_STARTED: {
      BACKGROUND: "#ffebee",
      TEXT: "#d32f2f",
    },
  },
  ICON: {
    DEFAULT: "#757575",
    SELECTED: "#2196F3",
    EMPTY: "#bdbdbd",
  },
  TEXT: {
    PRIMARY: "#757575",
    SECONDARY: "#9e9e9e",
  },
} as const;
