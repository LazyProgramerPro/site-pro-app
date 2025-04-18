import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";

import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import {
  Construction,
  Project,
} from "../../redux/slices/acceptanceRequestSlice";
import AcceptanceRequestFieldSelector from "./AcceptanceRequestFieldSelector";

interface AcceptanceRequestListHeaderProps {
  selectedProject: string | null;
  selectedConstruction: string | null;
  projects: Project[];
  constructions: Construction[];
  onProjectSelect: (project: string) => void;
  onConstructionSelect: (construction: string) => void;
  filterStatus: string | null;
  onFilterStatusChange: (status: string | null) => void;
  entryCount: number;
}

export default function AcceptanceRequestListHeader({
  selectedProject,
  selectedConstruction,
  projects,
  constructions,
  onProjectSelect,
  onConstructionSelect,
  filterStatus,
  onFilterStatusChange,
  entryCount,
}: AcceptanceRequestListHeaderProps) {
  return (
    <View style={styles.listHeader}>
      <Surface style={styles.selectors} elevation={1}>
        <AcceptanceRequestFieldSelector
          title={ACCEPTANCE_REQUEST_TEXTS.SELECT_PROJECT}
          icon={ICONS_NAME.PROJECT}
          items={projects}
          selectedItem={selectedProject || undefined}
          onSelect={onProjectSelect}
        />

        {selectedProject && (
          <View style={styles.selectorMargin}>
            <AcceptanceRequestFieldSelector
              title={ACCEPTANCE_REQUEST_TEXTS.SELECT_CONSTRUCTION}
              icon={ICONS_NAME.CONSTRUCTION}
              items={constructions}
              selectedItem={selectedConstruction || undefined}
              onSelect={onConstructionSelect}
            />
          </View>
        )}
      </Surface>

      {selectedProject && selectedConstruction && (
        <Text variant="titleMedium" style={styles.listTitle}>
          {entryCount} yêu cầu nghiệm thu
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <View style={styles.filterContainer}>
          <Chip
            selected={filterStatus === null}
            onPress={() => onFilterStatusChange(null)}
            style={styles.filterChip}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS.ALL}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED
            }
            onPress={() =>
              onFilterStatusChange(ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED)
            }
            style={styles.filterChip}
            icon={ICONS_NAME.CHECK_CIRCLE}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS.IN_PROGRESS
            }
            onPress={() =>
              onFilterStatusChange(ACCEPTANCE_REQUEST_TEXTS.STATUS.IN_PROGRESS)
            }
            style={styles.filterChip}
            icon={ICONS_NAME.CLOCK}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS.IN_PROGRESS}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS.NOT_STARTED
            }
            onPress={() =>
              onFilterStatusChange(ACCEPTANCE_REQUEST_TEXTS.STATUS.NOT_STARTED)
            }
            style={styles.filterChip}
            icon={ICONS_NAME.ALERT_CIRCLE}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS.NOT_STARTED}
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
