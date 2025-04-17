import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DIARY_ICONS, DIARY_TEXTS, DIARY_COLORS } from "../../constants/diary";

interface DiaryEmptyListProps {
  message?: string;
}

export default function DiaryEmptyList({ message }: DiaryEmptyListProps) {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name={DIARY_ICONS.NOTEBOOK}
        size={70}
        color={DIARY_COLORS.ICON.EMPTY}
      />
      <Text variant="titleMedium" style={styles.emptyText}>
        {message || DIARY_TEXTS.EMPTY_LIST.TITLE}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubText}>
        {DIARY_TEXTS.EMPTY_LIST.SUBTITLE}
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
    color: DIARY_COLORS.TEXT.PRIMARY,
  },
  emptySubText: {
    color: DIARY_COLORS.TEXT.SECONDARY,
    marginTop: 8,
  },
});
