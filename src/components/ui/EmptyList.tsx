import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICONS_NAME } from "../../constants/icon";
import { STATUS_COLORS } from "../../constants/styles";

interface EmptyListProps {
  message?: string;
}

export default function EmptyList({ message }: EmptyListProps) {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name={ICONS_NAME.NOTEBOOK}
        size={70}
        color={STATUS_COLORS.ICON.EMPTY}
      />
      <Text variant="titleMedium" style={styles.emptyText}>
        {message || "Không thấy dữ liệu bạn yêu cầu"}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubText}>
        Thử bộ lọc khác
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    color: STATUS_COLORS.TEXT.PRIMARY,
  },
  emptySubText: {
    color: STATUS_COLORS.TEXT.SECONDARY,
    marginTop: 8,
  },
});
