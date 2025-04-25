import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DIARY_TEXTS } from "../../constants/diary";
import { ICONS_NAME } from "../../constants/icon";
import { STATUS_COLORS } from "../../constants/styles";
import {
  cancelEditingDiary,
  deleteDiaryEntry,
  DiaryEntry,
  startEditingDiaryRequest,
} from "../../redux/slices/diarySlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CommonCard from "../ui/CommonCard";

interface DiaryEntryItemProps {
  item: DiaryEntry;
}

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export default function DiaryEntryItem({ item }: DiaryEntryItemProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { editingDiary, selectedProject, selectedConstruction } =
    useAppSelector((state: RootState) => state.diary);

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

  const handleOpenMenu = (itemId: number) => {
    dispatch(startEditingDiaryRequest(itemId));
  };
  const handleCloseMenu = () => {
    dispatch(cancelEditingDiary());
  };

  const handleViewPressDiary = (diary: DiaryEntry) => {
    navigation.navigate("ViewDiary", {
      diary: item,
    });
    handleCloseMenu();
  };

  const handleEditPressDiary = (diary: DiaryEntry) => {
    navigation.navigate("AddDiary", {
      projectId: selectedProject?.id ?? null,
      constructionId: selectedConstruction?.id ?? null,
      diary: item,
    });
    handleCloseMenu();
  };

  const handleDeletePressDiary = (diary: DiaryEntry) => {
    handleCloseMenu();
    dispatch(deleteDiaryEntry(diary.id));
  };

  return (
    <CommonCard
      isSelected={item.id === editingDiary?.id}
      onPress={() => handleViewPressDiary(item)}
      title={item.title}
      onMenuPress={() => handleOpenMenu(item.id)}
      showMenu={editingDiary?.id === item.id}
      onDismissMenu={handleCloseMenu}
      menuActions={{
        viewAction: {
          icon: ICONS_NAME.EYE,
          label: DIARY_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressDiary(item),
        },
        editAction: {
          icon: ICONS_NAME.PENCIL,
          label: DIARY_TEXTS.ACTIONS.EDIT,
          onPress: () => handleEditPressDiary(item),
        },
        deleteAction: {
          icon: ICONS_NAME.DELETE,
          label: DIARY_TEXTS.ACTIONS.DELETE,
          onPress: () => handleDeletePressDiary(item),
        },
      }}
    >
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
    </CommonCard>
  );
}

const styles = StyleSheet.create({
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
