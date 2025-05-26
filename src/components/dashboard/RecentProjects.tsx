import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  MD3Theme,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Ensured this is the one being used for status icon
import { ICONS_NAME } from "../../constants/icon"; // Added ICONS_NAME
import { PROJECT_TEXTS } from "../../constants/project"; // Added PROJECT_TEXTS
import { Project } from "../../redux/slices/projectSlice";
import StatusChip, { ProjectStatus } from "../ui/StatusChip"; // Import StatusChip and ProjectStatus

// Define a spacing object if not available in theme directly
// This can be moved to your theme.ts or a constants file
const appSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

type RecentProjectsProps = {
  projects: Project[];
  onProjectPress: (projectId: string) => void; // Changed to string to match Project.id
  onViewAllPress: () => void;
};

const RecentProjects = ({
  projects,
  onProjectPress,
  onViewAllPress,
}: RecentProjectsProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Re-use getStatusStyle from ProjectItem or define a similar one here
  // const getStatusStyle = (status: string | undefined) => { // Remove this
  //   switch (status) {
  //     case "in_progress":
  //       return {
  //         backgroundColor: theme.colors.blue200,
  //         borderColor: theme.colors.blue700,
  //         color: theme.colors.blue700,
  //       };
  //     case "completed":
  //       return {
  //         backgroundColor: theme.colors.green200,
  //         borderColor: theme.colors.green700,
  //         color: theme.colors.green700,
  //       };
  //     case "on_hold":
  //       return {
  //         backgroundColor: theme.colors.yellow200,
  //         borderColor: theme.colors.yellow700,
  //         color: theme.colors.yellow700,
  //       };
  //     case "cancelled":
  //       return {
  //         backgroundColor: theme.colors.red200,
  //         borderColor: theme.colors.red700,
  //         color: theme.colors.red700,
  //       };
  //     default:
  //       return {
  //         backgroundColor: theme.colors.grey200,
  //         borderColor: theme.colors.grey700,
  //         color: theme.colors.grey700,
  //       };
  //   }
  // };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  const renderProjectItem = (project: Project) => {
    // const statusStyle = getStatusStyle(project.status); // Remove this
    return (
      <Card style={styles.projectCard} mode="elevated">
        {project.image ? (
          <Card.Cover
            source={{ uri: project.image }}
            style={styles.projectImage}
          />
        ) : (
          <View style={styles.avatarContainer}>
            <Avatar.Icon
              size={60} // Adjusted size
              icon={ICONS_NAME.IMAGE}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}
        <Card.Content style={styles.projectContent}>
          <Text
            variant="titleMedium"
            numberOfLines={2} // Allow two lines for name
            style={styles.projectName}
          >
            {project.name}
          </Text>
          <Text variant="bodySmall" style={styles.projectCode}>
            {project.code}
          </Text>

          {/* Status Chip */}
          {/* Replace Chip with StatusChip */}
          {project.status && (
            <StatusChip status={project.status as ProjectStatus} />
          )}

          {/* Progress Section */}
          {project.progress !== undefined && (
            <View style={styles.progressSection}>
              <View style={styles.progressLabelContainer}>
                <Icon
                  name={ICONS_NAME.CHART_BAR} // Use name prop
                  size={16}
                  color={theme.colors.primary}
                />
                <Text variant="labelMedium" style={styles.progressText}>
                  {PROJECT_TEXTS.INFO.PROGRESS}: {project.progress}%
                </Text>
              </View>
              <ProgressBar
                progress={(project.progress || 0) / 100}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
            </View>
          )}

          {/* Dates Section - Simplified */}
          <View style={styles.detailRowWrapped}>
            {project.start_at && (
              <View style={styles.detailItemHalfWidth}>
                <Icon
                  name={ICONS_NAME.CALENDAR_START} // Use name prop
                  size={14}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="bodySmall" style={styles.detailText}>
                  {PROJECT_TEXTS.INFO.START_DATE}:{" "}
                  {formatDate(project.start_at)}
                </Text>
              </View>
            )}
            {project.finish_at && (
              <View style={styles.detailItemHalfWidth}>
                <Icon
                  name={ICONS_NAME.CALENDAR_CHECK} // Use name prop
                  size={14}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="bodySmall" style={styles.detailText}>
                  {PROJECT_TEXTS.INFO.FINISH_DATE}:{" "}
                  {formatDate(project.finish_at)}
                </Text>
              </View>
            )}
          </View>

          {/* Key Personnel - Simplified */}
          {project.nha_thau_thi_cong_name && (
            <View style={styles.detailRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT_HARD_HAT} // Use name prop
                size={14}
                color={theme.colors.onSurfaceVariant}
              />
              <Text
                variant="bodySmall"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.detailText}
              >
                {PROJECT_TEXTS.INFO.CONTRACTOR}:{" "}
                {project.nha_thau_thi_cong_name}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Dự án gần đây
        </Text>
        <Button
          mode="text"
          compact
          onPress={onViewAllPress}
          style={styles.viewAllButton}
          labelStyle={styles.viewAllButtonLabel}
          icon="arrow-right"
        >
          Xem tất cả
        </Button>
      </View>

      {projects.length > 0 ? (
        projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => onProjectPress(project.id)} // project.id is already a string
            style={styles.touchableCard}
          >
            {renderProjectItem(project)}
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name={ICONS_NAME.FOLDER_ACCOUNT || "folder-account-outline"} // Fallback icon name
            size={48}
            color={theme.colors.onSurfaceVariant}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>Chưa có dự án nào gần đây.</Text>
        </View>
      )}
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      // paddingVertical: appSpacing.md, // Consider removing if sectionHeader has margin
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: appSpacing.md,
      marginBottom: appSpacing.md,
    },
    sectionTitle: {
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    viewAllButton: {},
    viewAllButtonLabel: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    touchableCard: {
      marginHorizontal: appSpacing.md,
      marginBottom: appSpacing.lg, // Increased bottom margin for better separation
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2, // Slightly increased shadow
      },
      shadowOpacity: 0.1, // Softer shadow
      shadowRadius: 4, // Softer shadow
      elevation: 3, // Adjusted elevation
    },
    projectCard: {
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
      elevation: 0, // Elevation is handled by touchableCard for consistency
    },
    projectImage: {
      height: 150, // Slightly increased image height
      backgroundColor: theme.colors.surfaceVariant,
    },
    avatarContainer: {
      // Added for fallback image
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    projectContent: {
      padding: appSpacing.md,
    },
    projectName: {
      color: theme.colors.onSurface,
      fontWeight: "bold", // Make name bold
      fontSize: 18, // Slightly larger font size
      marginBottom: appSpacing.xs, // Reduced space after project name
    },
    projectCode: {
      // Added style for project code
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
      marginBottom: appSpacing.sm,
    },
    statusChip: {
      // Styles for status chip
      alignSelf: "flex-start",
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      marginBottom: appSpacing.md,
      paddingHorizontal: 0, // Remove if icon adds too much padding
    },
    statusText: {
      // Styles for status text
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 16,
    },
    progressSection: {
      // Container for progress bar and text
      marginBottom: appSpacing.sm,
    },
    progressLabelContainer: {
      // For icon and progress text
      flexDirection: "row",
      alignItems: "center",
      marginBottom: appSpacing.xs,
    },
    progressText: {
      // For "Tiến độ: 70%"
      color: theme.colors.primary,
      marginLeft: appSpacing.xs,
      fontWeight: "bold",
    },
    progressBar: {
      height: 6, // Slimmer progress bar
      borderRadius: 3,
      backgroundColor:
        theme.colors.surfaceDisabled || theme.colors.outlineVariant,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: appSpacing.xs, // Reduced margin for denser info
    },
    detailRowWrapped: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: appSpacing.xs,
      flexWrap: "wrap",
    },
    detailItemHalfWidth: {
      // Simplified from PaddedRight/Left
      flexDirection: "row",
      alignItems: "center",
      width: "100%", // Take full width on small screens, wrap will handle
      marginBottom: appSpacing.xs, // Space between wrapped items
      paddingRight: appSpacing.sm, // Add some padding for wrapped items
    },
    detailTextLabel: {
      color: theme.colors.onSurfaceVariant,
      marginLeft: appSpacing.sm,
      marginBottom: appSpacing.xs,
    },
    detailText: {
      color: theme.colors.onSurfaceVariant,
      marginLeft: appSpacing.xs, // Reduced margin for icon
      flexShrink: 1,
      fontSize: 12, // Smaller font for details
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: appSpacing.lg * 2, // Increased vertical padding
      marginHorizontal: appSpacing.md,
      minHeight: 200, // Ensure a minimum height for the empty state
    },
    emptyIcon: {
      // Added style for the icon
      marginBottom: appSpacing.md,
      opacity: 0.7, // Slightly transparent icon
    },
    emptyText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fonts.bodyLarge.fontSize, // Use theme font size
      textAlign: "center", // Center text if it wraps
      lineHeight: (theme.fonts.bodyLarge.fontSize || 16) * 1.5, // Improved line height
    },
  });

export default RecentProjects;
