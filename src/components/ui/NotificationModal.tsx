import React from "react";
import { StyleSheet, View, ScrollView, Modal } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

interface NotificationModalProps {
  visible: boolean;
  onDismiss: () => void;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
  }>;
}

export default function NotificationModal({
  visible,
  onDismiss,
  notifications,
}: NotificationModalProps) {
  console.log("Notifications received:", notifications);

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text variant="headlineSmall" style={styles.title}>
            Thông báo
          </Text>
          <View style={styles.content}>
            {notifications && notifications.length > 0 ? (
              <View>
                {notifications.map((notification) => (
                  <View
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      // !notification.isRead && styles.unreadNotification,
                    ]}
                  >
                    <Text
                      variant="titleMedium"
                      style={styles.notificationTitle}
                    >
                      {notification.title}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={styles.notificationMessage}
                    >
                      {notification.message}
                    </Text>
                    <Text variant="bodySmall" style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>Không có thông báo mới</Text>
            )}
          </View>
          <View style={styles.actions}>
            <Button onPress={onDismiss}>Đóng</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    maxHeight: "80%",
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
    padding: 16,
  },
  title: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray200,
  },
  content: {
    maxHeight: 400,
    padding: 0,
  },
  notificationItem: {
    padding: 12,
  },
  unreadNotification: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
  notificationTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationMessage: {
    color: GlobalStyles.colors.gray700,
    marginBottom: 4,
  },
  notificationTime: {
    color: GlobalStyles.colors.gray500,
  },
  emptyText: {
    textAlign: "center",
    color: GlobalStyles.colors.gray500,
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.gray200,
  },
});
