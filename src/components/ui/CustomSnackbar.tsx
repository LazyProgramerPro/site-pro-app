import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, Text, useTheme } from "react-native-paper";

type SnackbarType = "success" | "error" | "info" | "warning";

interface CustomSnackbarProps {
  visible: boolean;
  message: string;
  type?: SnackbarType;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  onDismiss: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  visible,
  message,
  type = "info",
  duration = 5000,
  action,
  onDismiss,
}) => {
  const theme = useTheme();

  // Xác định màu sắc và icon dựa trên loại thông báo
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: theme.colors.primary,
          iconName: "check-circle",
        };
      case "error":
        return {
          backgroundColor: theme.colors.error,
          iconName: "alert-circle",
        };
      case "warning":
        return {
          backgroundColor: "#FF9800",
          iconName: "alert",
        };
      case "info":
      default:
        return {
          backgroundColor: "#2196F3",
          iconName: "information",
        };
    }
  };

  const { backgroundColor, iconName } = getTypeConfig();

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration}
        style={[styles.snackbar, { backgroundColor }]}
        action={
          action || {
            label: "Đóng",
            onPress: onDismiss,
            labelStyle: { color: "#FFFFFF", fontWeight: "bold" },
          }
        }
        wrapperStyle={styles.wrapper}
      >
        <View style={styles.contentContainer}>
          <MaterialCommunityIcons
            name={iconName as any}
            size={20}
            color="#FFFFFF"
            style={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 1000,
    elevation: 10,
  },
  snackbar: {
    elevation: 6,
    borderRadius: 8,
  },
  wrapper: {
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  message: {
    color: "#FFFFFF",
    flex: 1,
    fontSize: 14,
  },
});

export default CustomSnackbar;
