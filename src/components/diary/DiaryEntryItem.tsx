import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DIARY_TEXTS } from "../../constants/diary";
import BottomSheetPopup from "../ui/BottomSheetPopup";
import { STATUS_COLORS } from "../../constants/styles";
import { ICONS_NAME } from "../../constants/icon";
import type { DiaryEntry } from "../../redux/slices/diarySlice";

interface DiaryEntryItemProps {
  item: DiaryEntry;
  selectedItem: DiaryEntry | null;
  onSelect: (item: DiaryEntry) => void;
  visibleItemMenu: number | null;
  onMenuPress: (itemId: number) => void;
  onMenuDismiss: () => void;
  onViewPress: (item: DiaryEntry) => void;
  onEditPress: (item: DiaryEntry) => void;
  onDeletePress: (item: DiaryEntry) => void;
}

export default function DiaryEntryItem({
  item,
  selectedItem,
  onSelect,
  visibleItemMenu,
  onMenuPress,
  onMenuDismiss,
  onViewPress,
  onEditPress,
  onDeletePress,
}: DiaryEntryItemProps) {
  const theme = useTheme();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case DIARY_TEXTS.STATUS.COMPLETED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.COMPLETED.TEXT,
        };
      case DIARY_TEXTS.STATUS.IN_PROGRESS:
        return {
          icon: ICONS_NAME.CLOCK,
          backgroundColor: STATUS_COLORS.STATUS.IN_PROGRESS.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.IN_PROGRESS.TEXT,
        };
      default:
        return {
          icon: ICONS_NAME.ALERT_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.NOT_STARTED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.NOT_STARTED.TEXT,
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  const handleMenuPress = () => {
    onMenuPress(item.id);
  };

  return (
    <>
      <Card
        style={[
          styles.card,
          item.id === selectedItem?.id && styles.selectedCard,
        ]}
        onPress={() => onSelect(item)}
      >
        <Card.Content>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderLeft}>
              <Icon
                name={ICONS_NAME.NOTEBOOK}
                size={20}
                color={
                  item.id === selectedItem?.id
                    ? STATUS_COLORS.ICON.SELECTED
                    : STATUS_COLORS.ICON.DEFAULT
                }
              />
              <Text
                variant="titleMedium"
                style={item.id === selectedItem?.id ? styles.selectedText : {}}
              >
                {item.title}
              </Text>
            </View>
            <IconButton
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={handleMenuPress}
            />
          </View>

          <View style={styles.contentSection}>
            <Chip
              icon={statusStyle.icon}
              style={[
                styles.statusChip,
                { backgroundColor: statusStyle.backgroundColor },
              ]}
              textStyle={[styles.statusText, { color: statusStyle.textColor }]}
            >
              {item.status}
            </Chip>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.CALENDAR}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">{item.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT_EDIT}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {DIARY_TEXTS.INFO.UPDATED_BY}{" "}
                <Text style={styles.userText}>{item.updatedBy}</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {DIARY_TEXTS.INFO.CREATED_BY}{" "}
                <Text style={styles.userText}>{item.createdBy}</Text>
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {visibleItemMenu === item.id && (
        <BottomSheetPopup
          visible={true}
          onDismiss={onMenuDismiss}
          title="Tùy chọn"
          viewAction={{
            icon: ICONS_NAME.EYE,
            label: DIARY_TEXTS.ACTIONS.VIEW,
            onPress: () => onViewPress(item),
          }}
          editAction={{
            icon: ICONS_NAME.PENCIL,
            label: DIARY_TEXTS.ACTIONS.EDIT,
            onPress: () => onEditPress(item),
          }}
          deleteAction={{
            icon: ICONS_NAME.DELETE,
            label: DIARY_TEXTS.ACTIONS.DELETE,
            onPress: () => onDeletePress(item),
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: STATUS_COLORS.ICON.SELECTED,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  selectedText: {
    fontWeight: "700",
    color: STATUS_COLORS.ICON.SELECTED,
  },
  contentSection: {
    paddingLeft: 4,
  },
  infoRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 6,
  },
  userText: {
    fontWeight: "500",
  },
  statusChip: {
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  statusText: {
    fontSize: 12,
  },
});
