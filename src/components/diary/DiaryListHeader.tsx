import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { DIARY_TEXTS } from "../../constants/diary";
import { ICONS_NAME } from "../../constants/icon";
import {
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
  getDiaryList,
} from "../../redux/slices/diarySlice";
import {
  Construction,
  Project,
  getConstructions,
} from "../../redux/slices/projectSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import FieldSelector from "../ui/FieldSelector";
export default function DiaryListHeader() {
  const dispatch = useAppDispatch();
  const {
    projects,
    constructions,
    selectedProject,
    selectedConstruction,
    entries,
    query: { filterStatus },
  } = useAppSelector((state: RootState) => state.diary);

  console.log("filterStatus", filterStatus);

  const handleSelectedProject = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(setSelectedConstruction(null)); // Reset construction when project changes
    dispatch(getConstructions(project.id)); // Fetch constructions for the selected project
  };

  const fetchDiaryList = ({
    construction,
    status,
  }: {
    construction?: Construction;
    status?: string | null;
  }) => {
    dispatch(
      getDiaryList({
        projectId: selectedProject?.id,
        constructionId: construction?.id
          ? construction?.id
          : selectedConstruction?.id,
        status: status ? status : undefined,
      })
    );
  };

  const handleConstructionSelect = (construction: Construction) => {
    dispatch(setSelectedConstruction(construction));
    fetchDiaryList({ construction });
  };

  const onFilterStatusChange = (status: string | null) => {
    dispatch(setFilterStatus(status));
    fetchDiaryList({ status });
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
          {entries.length} nhật ký
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
            icon={ICONS_NAME.CHECK_CIRCLE}
          >
            {DIARY_TEXTS.STATUS.COMPLETED}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.IN_PROGRESS}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.IN_PROGRESS)}
            style={styles.filterChip}
            icon={ICONS_NAME.CLOCK}
          >
            {DIARY_TEXTS.STATUS.IN_PROGRESS}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.NOT_STARTED}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.NOT_STARTED)}
            style={styles.filterChip}
            icon={ICONS_NAME.ALERT_CIRCLE}
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
