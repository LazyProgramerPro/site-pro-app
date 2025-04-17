import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DIARY_COLORS, DIARY_ICONS, DIARY_TEXTS } from "../../constants/diary";
import BottomSheetPopup from "../ui/BottomSheetPopup";

export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  status: string;
  updatedBy: string;
  createdBy: string;
}

interface DiaryEntryItemProps {
  item: DiaryEntry;
  selectedItem: DiaryEntry | null;
  onSelect: (item: DiaryEntry) => void;
  visibleItemMenu: string | null;
  onMenuPress: (itemId: string) => void;
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
          icon: DIARY_ICONS.CHECK_CIRCLE,
          backgroundColor: DIARY_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: DIARY_COLORS.STATUS.COMPLETED.TEXT,
        };
      case DIARY_TEXTS.STATUS.IN_PROGRESS:
        return {
          icon: DIARY_ICONS.CLOCK,
          backgroundColor: DIARY_COLORS.STATUS.IN_PROGRESS.BACKGROUND,
          textColor: DIARY_COLORS.STATUS.IN_PROGRESS.TEXT,
        };
      default:
        return {
          icon: DIARY_ICONS.ALERT_CIRCLE,
          backgroundColor: DIARY_COLORS.STATUS.NOT_STARTED.BACKGROUND,
          textColor: DIARY_COLORS.STATUS.NOT_STARTED.TEXT,
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

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
                name={DIARY_ICONS.NOTEBOOK}
                size={20}
                color={
                  item.id === selectedItem?.id
                    ? DIARY_COLORS.ICON.SELECTED
                    : DIARY_COLORS.ICON.DEFAULT
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
              icon={DIARY_ICONS.DOTS_VERTICAL}
              onPress={() => onMenuPress(item.id)}
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
                name={DIARY_ICONS.CALENDAR}
                size={16}
                color={DIARY_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">{item.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={DIARY_ICONS.ACCOUNT_EDIT}
                size={16}
                color={DIARY_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {DIARY_TEXTS.INFO.UPDATED_BY}{" "}
                <Text style={styles.userText}>{item.updatedBy}</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={DIARY_ICONS.ACCOUNT}
                size={16}
                color={DIARY_COLORS.ICON.DEFAULT}
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

      <BottomSheetPopup
        visible={visibleItemMenu === item.id}
        onDismiss={onMenuDismiss}
        title="Tùy chọn"
        viewAction={{
          icon: DIARY_ICONS.EYE,
          label: DIARY_TEXTS.ACTIONS.VIEW,
          onPress: () => onViewPress(item),
        }}
        editAction={{
          icon: DIARY_ICONS.PENCIL,
          label: DIARY_TEXTS.ACTIONS.EDIT,
          onPress: () => onEditPress(item),
        }}
        deleteAction={{
          icon: DIARY_ICONS.DELETE,
          label: DIARY_TEXTS.ACTIONS.DELETE,
          onPress: () => onDeletePress(item),
        }}
      />
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
    borderColor: DIARY_COLORS.ICON.SELECTED,
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
    color: DIARY_COLORS.ICON.SELECTED,
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
