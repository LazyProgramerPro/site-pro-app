import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import { DIARY_ICONS, DIARY_TEXTS } from "../../constants/diary";
import DiaryFieldSelector from "./DiaryFieldSelector";

interface DiaryListHeaderProps {
  selectedProject: string | null;
  selectedConstruction: string | null;
  projects: string[];
  constructions: { [key: string]: string[] };
  onProjectSelect: (project: string) => void;
  onConstructionSelect: (construction: string) => void;
  filterStatus: string | null;
  onFilterStatusChange: (status: string | null) => void;
  entryCount: number;
}

export default function DiaryListHeader({
  selectedProject,
  selectedConstruction,
  projects,
  constructions,
  onProjectSelect,
  onConstructionSelect,
  filterStatus,
  onFilterStatusChange,
  entryCount,
}: DiaryListHeaderProps) {
  return (
    <View style={styles.listHeader}>
      <Surface style={styles.selectors} elevation={1}>
        <DiaryFieldSelector
          title={DIARY_TEXTS.SELECT_PROJECT}
          icon={DIARY_ICONS.PROJECT}
          items={projects}
          selectedItem={selectedProject || undefined}
          onSelect={onProjectSelect}
        />

        {selectedProject && (
          <View style={styles.selectorMargin}>
            <DiaryFieldSelector
              title={DIARY_TEXTS.SELECT_CONSTRUCTION}
              icon={DIARY_ICONS.CONSTRUCTION}
              items={constructions[selectedProject]}
              selectedItem={selectedConstruction || undefined}
              onSelect={onConstructionSelect}
            />
          </View>
        )}
      </Surface>

      {selectedProject && selectedConstruction && (
        <Text variant="titleMedium" style={styles.listTitle}>
          {entryCount} nhật ký
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <View style={styles.filterContainer}>
          <Chip
            selected={filterStatus === null}
            onPress={() => onFilterStatusChange(null)}
            style={styles.filterChip}
          >
            {DIARY_TEXTS.STATUS.ALL}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.COMPLETED}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.COMPLETED)}
            style={styles.filterChip}
            icon={DIARY_ICONS.CHECK_CIRCLE}
          >
            {DIARY_TEXTS.STATUS.COMPLETED}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.IN_PROGRESS}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.IN_PROGRESS)}
            style={styles.filterChip}
            icon={DIARY_ICONS.CLOCK}
          >
            {DIARY_TEXTS.STATUS.IN_PROGRESS}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.NOT_STARTED}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.NOT_STARTED)}
            style={styles.filterChip}
            icon={DIARY_ICONS.ALERT_CIRCLE}
          >
            {DIARY_TEXTS.STATUS.NOT_STARTED}
          </Chip>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    marginBottom: 16,
  },
  listTitle: {
    marginBottom: 12,
    marginTop: 12,
    fontWeight: "500",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  selectors: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  selectorMargin: {
    marginTop: 12,
  },
});
