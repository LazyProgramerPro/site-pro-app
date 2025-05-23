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
import { STATUS_COLORS, GlobalStyles } from "../../constants/styles";
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

  const handleViewPressProject = (projectItem: Project) => {
    navigation.navigate("ProjectDetails", { projectId: projectItem.id });
  };

  const handleDeletePressProject = () => {
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    // TODO: Implement actual delete logic
    // dispatch(deleteProject(item.id))
    //   .unwrap()
    //   .then(() => {
    //     setSnackbarVisible(true);
    //     handleCloseMenu();
    //   })
    //   .catch((error) => {
    //     console.error("Failed to delete project:", error);
    //   });
    setSnackbarVisible(true);
    handleCloseMenu();
    setDeleteDialogVisible(false);
  };

  const handleOpenMenu = (projectId: string) => {
    dispatch(startEditingProject(projectId));
  };

  const handleCloseMenu = () => {
    dispatch(cancelEditingProject());
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return PROJECT_TEXTS.COMMON.NOT_AVAILABLE;
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch (e) {
      return PROJECT_TEXTS.COMMON.NOT_AVAILABLE;
    }
  };

  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case PROJECT_TEXTS.STATUS_LABEL.APPROVED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.COMPLETED.TEXT,
        };
      case PROJECT_TEXTS.STATUS_LABEL.IN_PROGRESS:
        return {
          icon: ICONS_NAME.PROGRESS_WRENCH,
          backgroundColor: STATUS_COLORS.STATUS.IN_PROGRESS.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.IN_PROGRESS.TEXT,
        };
      case PROJECT_TEXTS.STATUS_LABEL.PENDING:
        return {
          icon: ICONS_NAME.TIMER_SAND,
          backgroundColor: STATUS_COLORS.STATUS.PENDING.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.PENDING.TEXT,
        };
      case PROJECT_TEXTS.STATUS_LABEL.REJECTED:
        return {
          icon: ICONS_NAME.CLOSE_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.REJECTED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.REJECTED.TEXT,
        };
      default:
        return {
          icon: ICONS_NAME.HELP_CIRCLE,
          backgroundColor: GlobalStyles.colors.gray200,
          textColor: GlobalStyles.colors.gray700,
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  const renderInfoRow = (
    iconName: string,
    label: string,
    value: string | undefined,
    isUser = false,
    numberOfLines = 1
  ) => {
    if (!value) return null;
    return (
      <View style={styles.infoRow}>
        <Icon
          name={iconName}
          size={16}
          color={theme.colors.onSurfaceVariant}
          style={styles.infoIcon}
        />
        <Text variant="bodyMedium" style={styles.infoLabel}>
          {label}:{" "}
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.infoValue, isUser && styles.userText]}
          numberOfLines={numberOfLines}
          ellipsizeMode="tail"
        >
          {value}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Card
        style={[
          styles.card,
          item.id === editingProject?.id && styles.selectedCard,
        ]}
        onPress={() => handleViewPressProject(item)}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.headerSection}>
            <View style={styles.projectNameContainer}>
              <Icon
                name={ICONS_NAME.FOLDER_ACCOUNT}
                size={24}
                color={
                  item.id === editingProject?.id
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant
                }
              />
              <Text
                variant="titleLarge"
                style={[
                  styles.projectName,
                  item.id === editingProject?.id && styles.selectedText,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <IconButton
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={() => handleOpenMenu(item.id)}
              iconColor={
                item.id === editingProject?.id
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
          </View>

          <View style={styles.contentSection}>
            {renderInfoRow(
              ICONS_NAME.CODE_BRACES,
              PROJECT_TEXTS.INFO.CODE,
              item.code
            )}

            <View style={styles.infoRow}>
              <Icon
                name={statusStyle.icon}
                size={16}
                color={statusStyle.textColor}
                style={styles.infoIcon}
              />
              <Text variant="bodyMedium" style={styles.infoLabel}>
                {PROJECT_TEXTS.INFO.STATUS}:{" "}
              </Text>
              <Chip
                style={[
                  styles.statusChip,
                  { backgroundColor: statusStyle.backgroundColor },
                ]}
                textStyle={[
                  styles.statusText,
                  { color: statusStyle.textColor },
                ]}
              >
                {item.status || PROJECT_TEXTS.STATUS_LABEL.UNKNOWN}
              </Chip>
            </View>

            {renderInfoRow(
              ICONS_NAME.INFORMATION_OUTLINE,
              PROJECT_TEXTS.INFO.DESCRIPTION,
              item.description,
              false,
              2
            )}
            {renderInfoRow(
              ICONS_NAME.CALENDAR_START,
              PROJECT_TEXTS.INFO.START_DATE,
              formatDate(item.start_at)
            )}
            {renderInfoRow(
              ICONS_NAME.CALENDAR_CHECK,
              PROJECT_TEXTS.INFO.FINISH_DATE,
              formatDate(item.finish_at)
            )}
            {/* Removed combined approval/created date and by fields for brevity on card view
            {renderInfoRow(
              item.approvalDate
                ? ICONS_NAME.CALENDAR_MULTIPLE_CHECK
                : ICONS_NAME.CALENDAR_PLUS,
              item.approvalDate
                ? PROJECT_TEXTS.INFO.APPROVAL_DATE
                : PROJECT_TEXTS.INFO.CREATED_AT,
              formatDate(item.approvalDate || item.created_at)
            )}
            {renderInfoRow(
              item.approvedBy
                ? ICONS_NAME.ACCOUNT_CHECK
                : ICONS_NAME.ACCOUNT_EDIT,
              item.approvedBy
                ? PROJECT_TEXTS.INFO.APPROVED_BY
                : PROJECT_TEXTS.INFO.CREATED_BY,
              item.approvedBy || item.creator_id,
              true
            )}
            */}
            {/* Removed detailed contact/role information for brevity on card view
            {renderInfoRow(
              ICONS_NAME.ACCOUNT_HARD_HAT,
              PROJECT_TEXTS.INFO.CONSTRUCTION_CONTRACTOR,
              item.nha_thau_thi_cong_name,
              true
            )}
            {renderInfoRow(
              ICONS_NAME.ACCOUNT_EYE,
              PROJECT_TEXTS.INFO.SUPERVISION_CONSULTANT,
              item.tu_van_giam_sat_name,
              true
            )}
            {renderInfoRow(
              ICONS_NAME.PENCIL_RULER,
              PROJECT_TEXTS.INFO.DESIGN_CONSULTANT,
              item.tu_van_thiet_ke_name,
              true
            )}
            */}
          </View>
        </Card.Content>
      </Card>

      <BottomSheetPopup
        visible={item.id === editingProject?.id}
        onDismiss={handleCloseMenu}
        title={PROJECT_TEXTS.COMMON.OPTIONS}
        viewAction={{
          icon: ICONS_NAME.EYE,
          label: PROJECT_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressProject(item),
        }}
        deleteAction={{
          icon: ICONS_NAME.TRASH_CAN,
          label: PROJECT_TEXTS.ACTIONS.DELETE,
          onPress: handleDeletePressProject,
        }}
      />

      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
          style={{ backgroundColor: theme.colors.background }}
        >
          <Dialog.Title style={{ color: theme.colors.onSurface }}>
            {PROJECT_TEXTS.DIALOG.DELETE_TITLE}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {PROJECT_TEXTS.DIALOG.DELETE_MESSAGE}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setDeleteDialogVisible(false)}
              textColor={theme.colors.primary}
            >
              {PROJECT_TEXTS.ACTIONS.CANCEL}
            </Button>
            <Button
              onPress={confirmDelete}
              textColor={theme.colors.error}
              style={{ marginLeft: GlobalStyles.spacing.sm }}
            >
              {PROJECT_TEXTS.ACTIONS.DELETE}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: theme.colors.inverseSurface }}
        action={{
          label: PROJECT_TEXTS.COMMON.OK,
          textColor: theme.colors.inversePrimary,
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        <Text style={{ color: theme.colors.inverseOnSurface }}>
          {PROJECT_TEXTS.MESSAGES.DELETE_SUCCESS}
        </Text>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: GlobalStyles.spacing.md, // Use md for consistency with padding
    backgroundColor: GlobalStyles.colors.surface,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.outlineVariant,
    marginBottom: GlobalStyles.spacing.md, // Add space between cards
  },
  selectedCard: {
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1.5,
  },
  cardContent: {
    padding: GlobalStyles.spacing.md,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: GlobalStyles.spacing.md,
  },
  projectNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: GlobalStyles.spacing.sm,
  },
  projectName: {
    marginLeft: GlobalStyles.spacing.sm,
    fontWeight: "bold",
    color: GlobalStyles.colors.onSurface,
  },
  selectedText: {
    color: GlobalStyles.colors.primary,
  },
  contentSection: {
    // No specific styles needed here for now
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center", // Changed from flex-start to center for vertical alignment
    marginBottom: GlobalStyles.spacing.sm,
  },
  infoIcon: {
    marginRight: GlobalStyles.spacing.sm,
    // marginTop: GlobalStyles.spacing.xxs, // Removed marginTop as alignItems: center will handle vertical alignment
  },
  infoLabel: {
    fontWeight: "600",
    color: GlobalStyles.colors.onSurfaceVariant,
    marginRight: GlobalStyles.spacing.xs, // Add margin to separate label and value
  },
  infoValue: {
    flex: 1,
    color: GlobalStyles.colors.onSurface,
    textAlign: "left",
  },
  userText: {
    flexShrink: 1,
  },
  statusChip: {
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: GlobalStyles.spacing.sm,
    // marginLeft: GlobalStyles.spacing.xs, // Removed to allow Chip to take natural space or be centered if container allows
    borderRadius: GlobalStyles.spacing.xs,
    alignSelf: "flex-start", // Ensures chip doesn't stretch if infoRow has flex:1 on value
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 16, // Ensure text is vertically centered
    textAlign: "center", // Center text horizontally
  },
});
