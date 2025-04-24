import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

interface BackConfirmationModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  continueButtonText?: string;
  backButtonText?: string;
}

export default function BackConfirmationModal({
  visible,
  onDismiss,
  onConfirm,
  title = "Cảnh báo",
  description = "Bạn có thông tin chưa được lưu. Nếu quay lại bây giờ, tất cả dữ liệu sẽ bị mất.",
  continueButtonText = "Tiếp tục",
  backButtonText = "Quay lại",
}: BackConfirmationModalProps) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalIconContainer}>
            <IconButton
              icon="alert-circle"
              size={48}
              iconColor={theme.colors.error}
            />
          </View>

          <Text style={[styles.modalTitle, { color: theme.colors.error }]}>
            {title}
          </Text>

          <Text style={styles.modalDescription}>{description}</Text>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.cancelButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon="content-save"
            >
              {continueButtonText}
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={[
                styles.confirmButton,
                { backgroundColor: theme.colors.error },
              ]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon="arrow-left"
            >
              {backButtonText}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalContent: {
    alignItems: "center",
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 14,
  },
});
