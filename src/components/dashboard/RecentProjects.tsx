import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Text,
  useTheme,
  MD3Theme,
  Icon,
} from "react-native-paper";
import { GlobalStyles } from "../../constants/styles"; // Keep for fallbacks or other styles
import { Project } from "../../redux/slices/projectSlice";

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

  const getProgressColor = (progress: number | undefined) => {
    if (progress === undefined) return theme.colors.outline; // Default color for undefined progress
    if (progress > 80) {
      // Use a green color. If GlobalStyles has a suitable green, use it.
      // Otherwise, fallback to a standard green.
      return GlobalStyles.colors.primary600 || "#4CAF50"; // Example: Using primary600 or a fallback green
    }
    if (progress > 40) {
      // Use an orange/yellow color. If GlobalStyles has a suitable one, use it.
      // Otherwise, fallback to a standard orange.
      return GlobalStyles.colors.primary400 || "#FF9800"; // Example: Using primary400 or a fallback orange
    }
    return theme.colors.error || GlobalStyles.colors.red600;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  const renderProjectItem = (project: Project) => (
    <Card style={styles.projectCard} mode="elevated" elevation={2}>
      {" "}
      {/* Increased elevation */}
      <Card.Cover source={{ uri: project.image }} style={styles.projectImage} />
      <Card.Content style={styles.projectContent}>
        <Text
          variant="titleMedium"
          numberOfLines={1}
          style={styles.projectName}
        >
          {project.name}
        </Text>

        {/* Progress Section */}
        <View style={styles.detailRow}>
          <Icon
            source="progress-check"
            size={16}
            color={theme.colors.onSurfaceVariant}
          />
          <View style={styles.progressContainerFullWidth}>
            <Text variant="bodySmall" style={styles.detailTextLabel}>
              Tiến độ:{" "}
              {project.progress !== undefined ? `${project.progress}%` : "N/A"}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${project.progress || 0}%`,
                    backgroundColor: getProgressColor(project.progress),
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Dates Section */}
        <View style={styles.detailRowWrapped}>
          <View style={styles.detailItemHalfWidthPaddedRight}>
            <Icon
              source="calendar-start"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text variant="bodySmall" style={styles.detailText}>
              Bắt đầu: {formatDate(project.start_at)}
            </Text>
          </View>
          <View style={styles.detailItemHalfWidthPaddedLeft}>
            <Icon
              source="calendar-check"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text variant="bodySmall" style={styles.detailText}>
              Kết thúc: {formatDate(project.finish_at)}
            </Text>
          </View>
        </View>

        {/* Contractor Section */}
        {/* project.nha_thau_thi_cong_name && (
          <View style={styles.detailRow}>
            <Icon
              source="briefcase-outline"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="bodySmall"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.detailText}
            >
              Thi công: {project.nha_thau_thi_cong_name}
            </Text>
          </View>
        ) */}

        {/* Design Consultant Section */}
        {/* project.tu_van_thiet_ke_name && (
          <View style={styles.detailRow}>
            <Icon
              source="pencil-ruler"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="bodySmall"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.detailText}
            >
              Thiết kế: {project.tu_van_thiet_ke_name}
            </Text>
          </View>
        ) */}

        {/* Supervision Consultant Section */}
        {/* project.tu_van_giam_sat_name && (
          <View style={styles.detailRow}>
            <Icon
              source="eye-check-outline" // Or another suitable icon like "shield-check-outline"
              size={16}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="bodySmall"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.detailText}
            >
              Giám sát: {project.tu_van_giam_sat_name}
            </Text>
          </View>
        ) */}
      </Card.Content>
    </Card>
  );

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
          <Text style={styles.emptyText}>Chưa có dự án nào gần đây.</Text>
        </View>
      )}
    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      // paddingVertical: appSpacing.md,
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
      marginBottom: appSpacing.md,
      borderRadius: theme.roundness !== undefined ? theme.roundness : 12, // Ensure this matches projectCard
      // Add a subtle shadow for iOS if needed, Android uses elevation
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      // Elevation for Android is handled by the Card component itself
    },
    projectCard: {
      borderRadius: theme.roundness !== undefined ? theme.roundness : 12,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
      // borderWidth: 1, // Removed border
      // borderColor: theme.colors.outlineVariant, // Removed border
    },
    projectImage: {
      height: 130,
      backgroundColor: theme.colors.surfaceVariant, // Keep for placeholder effect
      // Add top border radius to match the card's radius
      borderTopLeftRadius: theme.roundness !== undefined ? theme.roundness : 12,
      borderTopRightRadius:
        theme.roundness !== undefined ? theme.roundness : 12,
    },
    projectContent: {
      padding: appSpacing.md,
    },
    projectName: {
      color: theme.colors.onSurface,
      marginBottom: appSpacing.md, // Increased space after project name
    },
    projectDetails: {
      // This style might not be directly used anymore, verify
      marginTop: appSpacing.sm,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: appSpacing.sm,
    },
    detailRowWrapped: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: appSpacing.sm,
      flexWrap: "wrap", // Allow wrapping if content is too long
    },
    detailItemHalfWidthPaddedRight: {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
      paddingRight: appSpacing.xs,
    },
    detailItemHalfWidthPaddedLeft: {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
      paddingLeft: appSpacing.xs,
    },
    detailTextLabel: {
      // For labels like "Tiến độ"
      color: theme.colors.onSurfaceVariant,
      marginLeft: appSpacing.sm,
      marginBottom: appSpacing.xs, // Space between label and progress bar
    },
    detailText: {
      color: theme.colors.onSurfaceVariant,
      marginLeft: appSpacing.sm,
      flexShrink: 1, // Allow text to shrink if needed
    },
    progressContainerFullWidth: {
      // Renamed from progressContainer
      flex: 1, // Take remaining width
      marginLeft: appSpacing.sm, // Keep consistent spacing with icon
    },
    progressText: {
      // This style might not be directly used anymore, verify
      marginBottom: appSpacing.xs,
      color: theme.colors.onSurfaceVariant,
    },
    progressBar: {
      height: 8,
      backgroundColor:
        theme.colors.surfaceDisabled ||
        theme.colors.outlineVariant ||
        GlobalStyles.colors.gray200,
      borderRadius: (theme.roundness !== undefined ? theme.roundness : 12) / 2,
      // marginTop: appSpacing.xs, // Add if label is above
    },
    progressFill: {
      height: "100%",
      borderRadius: (theme.roundness !== undefined ? theme.roundness : 12) / 2,
    },
    dateChip: {
      alignSelf: "flex-start",
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceVariant,
      height: 30,
    },
    chipText: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.onSurfaceVariant,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: appSpacing.lg,
      marginHorizontal: appSpacing.md,
    },
    emptyText: {
      color: theme.colors.onSurfaceVariant,
      fontStyle: "italic",
    },
  });

export default RecentProjects;
