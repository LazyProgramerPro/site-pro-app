import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Dialog,
  IconButton,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { ICONS_NAME } from "../../constants/icon";
import { PROJECT_TEXTS } from "../../constants/project";
import { STATUS_COLORS } from "../../constants/styles";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import {
  Project,
  cancelEditingProject,
  startEditingProject,
} from "../../redux/slices/projectSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import BottomSheetPopup from "../ui/BottomSheetPopup";

interface ProjectItemProps {
  item: Project;
}

export default function ProjectItem({ item }: ProjectItemProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { editingProject } = useSelector((state: RootState) => state.project);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const handleViewPressProject = (item: Project) => {
    console.log("View item:", item);
    navigation.navigate("ProjectDetails", {});
  };

  const handleDeletePressProject = (item: Project) => {
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    // TODO:
    // dispatch(deleteProject(item.id))
    //   .unwrap()
    //   .then(() => {
    //     setSnackbarVisible(true);
    //     handleCloseMenu();
    //   })
    //   .catch((error) => {
    //     console.error("Failed to delete:", error);
    //   });

    // Simulate successful deletion
    setSnackbarVisible(true);
    handleCloseMenu();
    setDeleteDialogVisible(false);
  };

  const handleOpenMenu = (projectId: number) => {
    dispatch(startEditingProject(projectId));
  };

  const handleCloseMenu = () => {
    console.log("Close menu"); // TODO: handle close menu logic when navigating away
    dispatch(cancelEditingProject());
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case PROJECT_TEXTS.STATUS_LABEL.APPROVED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.COMPLETED.TEXT,
        };
      case PROJECT_TEXTS.STATUS_LABEL.IN_PROGRESS:
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

  return (
    <>
      <Card
        style={[
          styles.card,
          item.id === editingProject?.id && styles.selectedCard,
        ]}
      >
        <Card.Content>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderLeft}>
              <Icon
                name={ICONS_NAME.NOTEBOOK}
                size={20}
                color={
                  item.id === editingProject?.id
                    ? STATUS_COLORS.ICON.SELECTED
                    : STATUS_COLORS.ICON.DEFAULT
                }
              />
              <Text
                variant="titleMedium"
                style={
                  item.id === editingProject?.id ? styles.selectedText : {}
                }
              >
                {item.name}
              </Text>
            </View>
            <IconButton
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={() => handleOpenMenu(item.id)}
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
              <Text variant="bodySmall">{item.approvalDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT_EDIT}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {PROJECT_TEXTS.INFO.UPDATED_BY}{" "}
                <Text style={styles.userText}>{item.approvedBy}</Text>
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
                {PROJECT_TEXTS.INFO.CREATED_BY}{" "}
                <Text style={styles.userText}>{item.code}</Text>
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <BottomSheetPopup
        visible={item.id === editingProject?.id}
        onDismiss={handleCloseMenu}
        title="Tùy chọn"
        viewAction={{
          icon: ICONS_NAME.EYE,
          label: PROJECT_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressProject(item),
        }}
        deleteAction={{
          icon: ICONS_NAME.DELETE,
          label: PROJECT_TEXTS.ACTIONS.DELETE,
          onPress: () => handleDeletePressProject(item),
        }}
      />

      {/* Confirm Delete Dialog */}
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Xác nhận xóa</Dialog.Title>
          <Dialog.Content>
            <Text>Bạn có chắc chắn muốn xóa dự án "{item.name}" không?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Hủy</Button>
            <Button onPress={confirmDelete} textColor={theme.colors.error}>
              Xóa
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Success Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Đóng",
          onPress: () => setSnackbarVisible(false),
        }}
        style={styles.snackbar}
      >
        Đã xóa dự án thành công
      </Snackbar>
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
    marginBottom: 0,
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
  snackbar: {
    marginBottom: 20,
  },
});
