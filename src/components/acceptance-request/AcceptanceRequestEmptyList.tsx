import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import { STATUS_COLORS } from "../../constants/styles";

interface AcceptanceRequestEmptyListProps {
  message?: string;
}

export default function AcceptanceRequestEmptyList({
  message,
}: AcceptanceRequestEmptyListProps) {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name={ICONS_NAME.NOTEBOOK}
        size={70}
        color={STATUS_COLORS.ICON.EMPTY}
      />
      <Text variant="titleMedium" style={styles.emptyText}>
        {message || ACCEPTANCE_REQUEST_TEXTS.EMPTY_LIST.TITLE}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubText}>
        {ACCEPTANCE_REQUEST_TEXTS.EMPTY_LIST.SUBTITLE}
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
