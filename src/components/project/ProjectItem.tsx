import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  ProgressBar,
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
import { GlobalStyles } from "../../constants/styles";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import {
  Project,
  cancelEditingProject,
  deleteProject,
  startEditingProject,
} from "../../redux/slices/projectSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import BottomSheetPopup from "../ui/BottomSheetPopup";
import StatusChip, { ProjectStatus } from "../ui/StatusChip"; // Import StatusChip and ProjectStatus

interface ProjectItemProps {
  item: Project;
}

export default function ProjectItem({ item }: ProjectItemProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { editingProject } = useSelector((state: RootState) => state.project);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const handleViewPressProject = (projectItem: Project) => {
    navigation.navigate("ProjectDetails", { projectId: projectItem.id });
  };

  const handleDeletePressProject = () => {
    setDeleteDialogVisible(true);
  };
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      // Gọi action xóa dự án
      await dispatch(deleteProject(item.id)).unwrap();

      setSnackbarMessage(PROJECT_TEXTS.MESSAGES.DELETE_SUCCESS);
      setSnackbarVisible(true);
      handleCloseMenu();
      setDeleteDialogVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa dự án:", error);
      setSnackbarMessage("Có lỗi xảy ra khi xóa dự án. Vui lòng thử lại.");
      setSnackbarVisible(true);
      handleCloseMenu();
      setDeleteDialogVisible(false);
    } finally {
      setIsDeleting(false);
    }
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
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return PROJECT_TEXTS.COMMON.NOT_AVAILABLE;
    }
  };

  const renderInfoRow = (
    iconNameKey: keyof typeof ICONS_NAME | null, // Changed variable name for clarity
    label: string,
    value: string | undefined | number,
    isUser = false,
    numberOfLines = 1,
    customValueStyle?: object
  ) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    )
      return null;
    return (
      <View style={styles.infoRow}>
        {iconNameKey && (
          <Icon
            name={ICONS_NAME[iconNameKey]} // Access icon name using the key
            size={18}
            color={theme.colors.onSurfaceVariant}
            style={styles.infoIcon}
          />
        )}
        <Text
          variant="bodyMedium"
          style={[styles.infoLabel, !iconNameKey && styles.infoLabelNoIcon]}
        >
          {label}:{" "}
        </Text>
        <Text
          variant="bodyMedium"
          style={[
            styles.infoValue,
            isUser && styles.userText,
            customValueStyle,
          ]}
          numberOfLines={numberOfLines}
          ellipsizeMode="tail"
        >
          {value}
          {label === PROJECT_TEXTS.INFO.PROGRESS &&
            item.progress !== undefined &&
            "%"}
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
        {item.image ? (
          <Card.Cover source={{ uri: item.image }} style={styles.cardCover} />
        ) : (
          <View style={styles.avatarContainer}>
            <Avatar.Icon
              size={80}
              icon={ICONS_NAME.IMAGE}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}

        <Card.Title
          title={item.name}
          titleStyle={[
            styles.cardTitle,
            item.id === editingProject?.id && styles.selectedText,
          ]}
          titleNumberOfLines={2}
          subtitle={item.code}
          subtitleStyle={styles.cardSubtitle}
          right={(props) => (
            <IconButton
              {...props}
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={() => handleOpenMenu(item.id)}
              iconColor={
                item.id === editingProject?.id
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
          )}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.statusAndProgressContainer}>
            {/* Replace Chip with StatusChip */}
            {item.status && (
              <StatusChip status={item.status as ProjectStatus} />
            )}
            {item.progress !== undefined && (
              <View style={styles.progressChipContainer}>
                <Icon
                  name={ICONS_NAME.CHART_BAR}
                  size={16}
                  color={theme.colors.primary}
                  style={{ marginRight: GlobalStyles.spacing.xs }}
                />
                <Text
                  style={[styles.progressText, { color: theme.colors.primary }]}
                >{`${item.progress}%`}</Text>
              </View>
            )}
          </View>

          {item.progress !== undefined && (
            <ProgressBar
              progress={(item.progress || 0) / 100}
              color={theme.colors.primary}
              style={styles.progressBar}
              visible={item.progress !== undefined}
            />
          )}

          {renderInfoRow(
            "INFORMATION_OUTLINE", // Pass as string key
            PROJECT_TEXTS.INFO.DESCRIPTION,
            item.description,
            false,
            2
          )}
          {renderInfoRow(
            "CALENDAR_START", // Pass as string key
            PROJECT_TEXTS.INFO.START_DATE,
            formatDate(item.start_at)
          )}
          {renderInfoRow(
            "CALENDAR_CHECK", // Pass as string key
            PROJECT_TEXTS.INFO.FINISH_DATE,
            formatDate(item.finish_at)
          )}
          {renderInfoRow(
            "CALENDAR_PLUS", // Pass as string key
            PROJECT_TEXTS.INFO.CREATED_AT,
            formatDate(item.created_at)
          )}
          {item.approvedBy &&
            renderInfoRow(
              "ACCOUNT_CHECK", // Pass as string key
              PROJECT_TEXTS.INFO.APPROVED_BY,
              item.approvedBy,
              true
            )}
          {item.approvalDate &&
            renderInfoRow(
              "CALENDAR_MULTIPLE_CHECK", // Pass as string key
              PROJECT_TEXTS.INFO.APPROVAL_DATE,
              formatDate(item.approvalDate)
            )}
          {renderInfoRow(
            "ACCOUNT_HARD_HAT", // Pass as string key
            PROJECT_TEXTS.INFO.CONTRACTOR,
            item.nha_thau_thi_cong_name,
            false,
            1
          )}
          {renderInfoRow(
            "ACCOUNT_EYE", // Pass as string key
            PROJECT_TEXTS.INFO.SUPERVISION_CONSULTANT,
            item.tu_van_giam_sat_name,
            false,
            1
          )}
          {renderInfoRow(
            "PENCIL_RULER", // Pass as string key
            PROJECT_TEXTS.INFO.DESIGN_CONSULTANT,
            item.tu_van_thiet_ke_name,
            false,
            1
          )}
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
          icon: ICONS_NAME.TRASH_CAN_OUTLINE,
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
          </Dialog.Content>{" "}
          <Dialog.Actions>
            <Button
              onPress={() => setDeleteDialogVisible(false)}
              textColor={theme.colors.primary}
              disabled={isDeleting}
            >
              {PROJECT_TEXTS.ACTIONS.CANCEL}
            </Button>
            <Button
              onPress={confirmDelete}
              textColor={theme.colors.error}
              style={{ marginLeft: GlobalStyles.spacing.sm }}
              loading={isDeleting}
              disabled={isDeleting}
            >
              {PROJECT_TEXTS.ACTIONS.DELETE}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>{" "}
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
          {snackbarMessage}
        </Text>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.surface,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.outlineVariant,
    marginBottom: 16,
    elevation: 2,
  },
  selectedCard: {
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 2,
    elevation: 4,
  },
  cardCover: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  avatarContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.outlineVariant,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontWeight: "bold",
    color: GlobalStyles.colors.onSurface,
    fontSize: 18,
  },
  cardSubtitle: {
    color: GlobalStyles.colors.onSurfaceVariant,
    fontSize: 12,
    marginTop: -4,
  },
  selectedText: {
    color: GlobalStyles.colors.primary,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  statusAndProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.primaryContainer,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalStyles.colors.outlineVariant,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoLabel: {
    fontWeight: "600",
    color: GlobalStyles.colors.onSurfaceVariant,
    marginRight: 4,
  },
  infoLabelNoIcon: {
    marginLeft: 0,
  },
  infoValue: {
    flex: 1,
    color: GlobalStyles.colors.onSurface,
    textAlign: "left",
    lineHeight: 18,
  },
  userText: {
    fontWeight: "500",
  },
});
