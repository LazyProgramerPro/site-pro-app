import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  MD3Theme,
  ProgressBar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICONS_NAME } from "../../constants/icon";
import { PROJECT_TEXTS } from "../../constants/project";
import { Project } from "../../redux/slices/projectSlice";
import StatusChip, { ProjectStatus } from "../ui/StatusChip";

// Sử dụng spacing chuẩn từ Material Design 3
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type RecentProjectsProps = {
  projects: Project[];
  onProjectPress: (projectId: string) => void;
  onViewAllPress: () => void;
};

const RecentProjects = ({
  projects,
  onProjectPress,
  onViewAllPress,
}: RecentProjectsProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return theme.colors.primary;
    if (progress >= 60) return "#4CAF50"; // Green
    if (progress >= 40) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  const renderProjectImage = (project: Project) => {
    if (project.image) {
      return (
        <Card.Cover
          source={{ uri: project.image }}
          style={styles.projectImage}
        />
      );
    }

    return (
      <View style={styles.imagePlaceholder}>
        <Avatar.Icon
          size={64}
          icon={ICONS_NAME.IMAGE}
          style={styles.avatarIcon}
          color={theme.colors.onSurfaceVariant}
        />
      </View>
    );
  };

  const renderProgressSection = (project: Project) => {
    if (project.progress === undefined) return null;

    const progressColor = getProgressColor(project.progress);

    return (
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View style={styles.progressLabelContainer}>
            <Icon name={ICONS_NAME.CHART_BAR} size={16} color={progressColor} />
            <Text
              variant="labelMedium"
              style={[styles.progressText, { color: progressColor }]}
            >
              {PROJECT_TEXTS.INFO.PROGRESS}
            </Text>
          </View>
          <Text
            variant="labelLarge"
            style={[styles.progressValue, { color: progressColor }]}
          >
            {project.progress}%
          </Text>
        </View>
        <ProgressBar
          progress={(project.progress || 0) / 100}
          color={progressColor}
          style={styles.progressBar}
        />
      </View>
    );
  };

  const renderProjectDetails = (project: Project) => {
    const details = [];

    if (project.start_at) {
      details.push({
        icon: ICONS_NAME.CALENDAR_START,
        label: PROJECT_TEXTS.INFO.START_DATE,
        value: formatDate(project.start_at),
      });
    }

    if (project.finish_at) {
      details.push({
        icon: ICONS_NAME.CALENDAR_CHECK,
        label: PROJECT_TEXTS.INFO.FINISH_DATE,
        value: formatDate(project.finish_at),
      });
    }

    if (project.nha_thau_thi_cong_name) {
      details.push({
        icon: ICONS_NAME.ACCOUNT_HARD_HAT,
        label: PROJECT_TEXTS.INFO.CONTRACTOR,
        value: project.nha_thau_thi_cong_name,
      });
    }

    return (
      <View style={styles.detailsContainer}>
        {details.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <Icon
              name={detail.icon}
              size={14}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="bodySmall"
              style={styles.detailText}
              numberOfLines={1}
            >
              <Text style={styles.detailLabel}>{detail.label}: </Text>
              {detail.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderProjectItem = (project: Project) => {
    return (
      <Surface style={styles.projectCard} elevation={2}>
        {renderProjectImage(project)}

        <View style={styles.projectContent}>
          {/* Header với tên và mã dự án */}
          <View style={styles.projectHeader}>
            <Text
              variant="titleMedium"
              numberOfLines={2}
              style={styles.projectName}
            >
              {project.name}
            </Text>
            <Text variant="bodySmall" style={styles.projectCode}>
              {project.code}
            </Text>
          </View>

          {/* Status */}
          {project.status && (
            <View style={styles.statusContainer}>
              <StatusChip status={project.status as ProjectStatus} />
            </View>
          )}

          {/* Progress */}
          {renderProgressSection(project)}

          {/* Chi tiết dự án */}
          {renderProjectDetails(project)}
        </View>
      </Surface>
    );
  };

  const renderEmptyState = () => (
    <Surface style={styles.emptyContainer} elevation={1}>
      <Icon
        name={ICONS_NAME.FOLDER_ACCOUNT || "folder-account-outline"}
        size={64}
        color={theme.colors.onSurfaceVariant}
        style={styles.emptyIcon}
      />
      <Text variant="titleMedium" style={styles.emptyTitle}>
        Chưa có dự án
      </Text>
      <Text variant="bodyMedium" style={styles.emptyText}>
        Hiện tại chưa có dự án nào gần đây để hiển thị
      </Text>
    </Surface>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <View>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Dự án gần đây
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            {projects.length} dự án được cập nhật
          </Text>
        </View>
        <Button
          mode="outlined"
          compact
          onPress={onViewAllPress}
          style={styles.viewAllButton}
          labelStyle={styles.viewAllButtonLabel}
          icon="arrow-right"
        >
          Xem tất cả
        </Button>
      </View>

      {/* Content */}
      {projects.length > 0 ? (
        <View style={styles.projectsList}>
          {projects.map((project, index) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => onProjectPress(project.id)}
              style={[
                styles.touchableCard,
                index === projects.length - 1 && styles.lastCard,
              ]}
              activeOpacity={0.7}
            >
              {renderProjectItem(project)}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: spacing.sm,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontWeight: "700",
      color: theme.colors.onSurface,
      letterSpacing: -0.5,
    },
    sectionSubtitle: {
      color: theme.colors.onSurfaceVariant,
      marginTop: spacing.xs,
    },
    viewAllButton: {
      borderRadius: 20,
      borderColor: theme.colors.outline,
    },
    viewAllButtonLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.primary,
    },
    projectsList: {
      paddingHorizontal: spacing.md,
    },
    touchableCard: {
      marginBottom: spacing.lg,
      borderRadius: 16,
      overflow: "hidden",
    },
    lastCard: {
      marginBottom: spacing.md,
    },
    projectCard: {
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
    },
    projectImage: {
      height: 140,
      backgroundColor: theme.colors.surfaceVariant,
    },
    imagePlaceholder: {
      height: 140,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
    },
    avatarIcon: {
      backgroundColor: theme.colors.surface,
    },
    projectContent: {
      padding: spacing.md,
    },
    projectHeader: {
      marginBottom: spacing.md,
    },
    projectName: {
      color: theme.colors.onSurface,
      fontWeight: "600",
      fontSize: 18,
      lineHeight: 24,
      marginBottom: spacing.xs,
    },
    projectCode: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 13,
      fontWeight: "500",
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    statusContainer: {
      marginBottom: spacing.md,
    },
    progressSection: {
      marginBottom: spacing.md,
    },
    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    progressLabelContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    progressText: {
      marginLeft: spacing.xs,
      fontWeight: "500",
      fontSize: 13,
    },
    progressValue: {
      fontWeight: "700",
      fontSize: 16,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.surfaceVariant,
    },
    detailsContainer: {
      gap: spacing.sm,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    detailText: {
      marginLeft: spacing.sm,
      flex: 1,
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 18,
    },
    detailLabel: {
      fontWeight: "500",
      color: theme.colors.onSurface,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.xl * 2,
      marginHorizontal: spacing.md,
      borderRadius: 16,
      backgroundColor: theme.colors.surface,
    },
    emptyIcon: {
      marginBottom: spacing.md,
      opacity: 0.6,
    },
    emptyTitle: {
      fontWeight: "600",
      color: theme.colors.onSurface,
      marginBottom: spacing.sm,
    },
    emptyText: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      lineHeight: 20,
      paddingHorizontal: spacing.md,
    },
  });

export default RecentProjects;
