import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import {
  AcceptanceRequest,
  Construction,
  getConstructions,
  Project,
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
} from "../../redux/slices/acceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import AcceptanceRequestFieldSelector from "./AcceptanceRequestFieldSelector";

export default function AcceptanceRequestListHeader() {
  const dispatch = useAppDispatch();

  const {
    projects,
    constructions,
    selectedProject,
    selectedConstruction,
    acceptanceRequestList,
    query: { filterStatus },
  } = useAppSelector((state: RootState) => state.acceptanceRequest);

  const handleSelectedProject = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(setSelectedConstruction(null)); // Reset construction when project changes
    dispatch(getConstructions(project.id)); // Fetch constructions for the selected project
  };

  const handleConstructionSelect = (construction: Construction) => {
    dispatch(setSelectedConstruction(construction));
  };

  const handleFilterStatusChange = (status: string | null) => {
    dispatch(setFilterStatus(status));
  };

  const filteredEntries = acceptanceRequestList.filter(
    (acceptanceRequest: AcceptanceRequest) =>
      !filterStatus || acceptanceRequest.status === filterStatus
  );

  return (
    <View style={styles.listHeader}>
      <Surface style={styles.selectors} elevation={1}>
        <AcceptanceRequestFieldSelector
          title={ACCEPTANCE_REQUEST_TEXTS.SELECT_PROJECT}
          icon={ICONS_NAME.PROJECT}
          items={projects}
          selectedItem={selectedProject?.name || undefined}
          onSelect={handleSelectedProject}
        />

        {selectedProject && (
          <View style={styles.selectorMargin}>
            <AcceptanceRequestFieldSelector
              title={ACCEPTANCE_REQUEST_TEXTS.SELECT_CONSTRUCTION}
              icon={ICONS_NAME.CONSTRUCTION}
              items={constructions}
              selectedItem={selectedConstruction?.name || undefined}
              onSelect={(item) => {
                // Check if the item is a Construction
                // and call the onConstructionSelect function

                if ("projectId" in item) {
                  handleConstructionSelect(item as Construction);
                }
              }}
            />
          </View>
        )}
      </Surface>

      {selectedProject && selectedConstruction && (
        <Text variant="titleMedium" style={styles.listTitle}>
          {filteredEntries.length}{" "}
          {ACCEPTANCE_REQUEST_TEXTS.NAME.toLocaleLowerCase()}
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <View style={styles.filterContainer}>
          <Chip
            selected={filterStatus === null}
            onPress={() => handleFilterStatusChange(null)}
            style={styles.filterChip}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS.ALL}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED
              )
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
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS.IN_PROGRESS
              )
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
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS.NOT_STARTED
              )
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
