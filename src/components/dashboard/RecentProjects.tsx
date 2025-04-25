import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { Project } from "../../redux/slices/projectSlice";

type RecentProjectsProps = {
  projects: Project[];
  onProjectPress: (projectId: number) => void;
  onViewAllPress: () => void;
};

const RecentProjects = ({
  projects,
  onProjectPress,
  onViewAllPress,
}: RecentProjectsProps) => {
  const renderProjectItem = (project: Project) => (
    <Card style={styles.projectCard} mode="elevated">
      <Card.Cover source={{ uri: project.image }} style={styles.projectImage} />
      <Card.Content style={styles.projectContent}>
        <Text variant="titleMedium" numberOfLines={1}>
          {project.name}
        </Text>

        <View style={styles.projectDetails}>
          <View style={styles.progressContainer}>
            <Text variant="bodySmall" style={styles.progressText}>
              Tiến độ: {project.progress}%
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${project.progress}%`,
                    backgroundColor:
                      project.progress > 80
                        ? "#4CAF50"
                        : project.progress > 40
                        ? "#FF9800"
                        : GlobalStyles.colors.red600,
                  },
                ]}
              />
            </View>
          </View>
          <Chip
            icon="calendar"
            compact
            mode="outlined"
            style={styles.dateChip}
            textStyle={styles.chipText}
          >
            {project.dueDate}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View>
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
        >
          Xem tất cả
        </Button>
      </View>

      {projects.map((project) => (
        <TouchableOpacity
          key={project.id}
          onPress={() => onProjectPress(project.id)}
        >
          {renderProjectItem(project)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  viewAllButton: {
    marginRight: -8,
  },
  viewAllButtonLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.primary500,
  },
  projectCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  projectImage: {
    height: 120,
  },
  projectContent: {
    paddingVertical: 12,
  },
  projectDetails: {
    marginTop: 12,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: GlobalStyles.colors.gray200,
    borderRadius: 3,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  dateChip: {
    alignSelf: "flex-start",
    height: 28,
  },
  chipText: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default RecentProjects;
