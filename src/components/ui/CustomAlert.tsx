import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

type AlertType = "success" | "error" | "info" | "warning";

interface CustomAlertProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  onDismiss,
  title,
  message,
  type = "info",
  confirmText = "OK",
  onConfirm,
  cancelText,
  onCancel,
}) => {
  const theme = useTheme();

  // Xác định màu sắc và icon dựa trên type
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          color: theme.colors.primary,
          icon: "check-circle",
          backgroundColor: `${theme.colors.primary}20`, // Thêm alpha 20%
        };
      case "error":
        return {
          color: theme.colors.error,
          icon: "alert-circle",
          backgroundColor: `${theme.colors.error}20`,
        };
      case "warning":
        return {
          color: "#FF9800",
          icon: "alert",
          backgroundColor: "#FF980020",
        };
      case "info":
      default:
        return {
          color: "#2196F3",
          icon: "information",
          backgroundColor: "#2196F320",
        };
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: typeConfig.backgroundColor },
          ]}
        >
          <MaterialCommunityIcons
            name={typeConfig.icon}
            size={36}
            color={typeConfig.color}
          />
        </View>

        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          {cancelText && onCancel && (
            <Button
              onPress={() => {
                onCancel();
                onDismiss();
              }}
              mode="text"
              textColor={theme.colors.outline}
              style={styles.cancelButton}
            >
              {cancelText}
            </Button>
          )}
          <Button
            onPress={() => {
              if (onConfirm) onConfirm();
              onDismiss();
            }}
            mode="contained"
            style={[
              styles.confirmButton,
              { backgroundColor: typeConfig.color },
            ]}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.white,
    paddingTop: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  cancelButton: {
    marginRight: 8,
  },
  confirmButton: {
    minWidth: 100,
  },
});

export default CustomAlert;
