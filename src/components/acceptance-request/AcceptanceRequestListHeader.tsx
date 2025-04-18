import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import {
  Construction,
  getAcceptanceRequestList,
  getConstructions,
  Project,
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
} from "../../redux/slices/acceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import FieldSelector from "../ui/FieldSelector";

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

    // After selecting a construction, you can also fetch acceptance requests for project and construction
    dispatch(
      getAcceptanceRequestList({
        projectId: selectedProject?.id,
        constructionId: construction.id,
      })
    );
  };

  const handleFilterStatusChange = (status: string | null) => {
    dispatch(setFilterStatus(status));
    dispatch(
      getAcceptanceRequestList({
        projectId: selectedProject?.id,
        constructionId: selectedConstruction?.id,
        status: status,
      })
    );
  };

  return (
    <View style={styles.listHeader}>
      <Surface style={styles.selectors} elevation={1}>
        <FieldSelector
          title={ACCEPTANCE_REQUEST_TEXTS.SELECT_PROJECT}
          icon={ICONS_NAME.PROJECT}
          items={projects}
          selectedItem={selectedProject?.name || undefined}
          onSelect={handleSelectedProject}
        />

        {selectedProject && (
          <View style={styles.selectorMargin}>
            <FieldSelector
              title={ACCEPTANCE_REQUEST_TEXTS.SELECT_CONSTRUCTION}
              icon={ICONS_NAME.CONSTRUCTION}
              items={constructions}
              selectedItem={selectedConstruction?.name || undefined}
              onSelect={handleConstructionSelect}
            />
          </View>
        )}
      </Surface>

      {selectedProject && selectedConstruction && (
        <Text variant="titleMedium" style={styles.listTitle}>
          {acceptanceRequestList.length}{" "}
          {ACCEPTANCE_REQUEST_TEXTS.NAME.toLocaleLowerCase()}
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <View style={styles.filterContainer}>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.ALL
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.ALL
              )
            }
            style={styles.filterChip}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS_LABEL.ALL}
          </Chip>

          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.APPROVED
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.APPROVED
              )
            }
            style={styles.filterChip}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS_LABEL.APPROVED}
          </Chip>

          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.IN_PROGRESS
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.IN_PROGRESS
              )
            }
            style={styles.filterChip}
            icon={ICONS_NAME.CLOCK}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS_LABEL.IN_PROGRESS}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.PENDING
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.PENDING
              )
            }
            style={styles.filterChip}
            icon={ICONS_NAME.ALERT_CIRCLE}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS_LABEL.PENDING}
          </Chip>
          <Chip
            selected={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.REJECTED
            }
            onPress={() =>
              handleFilterStatusChange(
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.REJECTED
              )
            }
            style={styles.filterChip}
            icon={ICONS_NAME.CANCEL}
          >
            {ACCEPTANCE_REQUEST_TEXTS.STATUS_LABEL.REJECTED}
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
