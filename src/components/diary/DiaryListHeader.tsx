import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import { GlobalStyles } from "../../constants/styles";
interface RenderIconProps {
  size: number;
}

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

  const renderIcon = (iconName: string, status: string | null) => {
    const isSelected = filterStatus === status;
    return ({ size }: RenderIconProps) => (
      <Icon name={iconName} size={size} color={isSelected ? "white" : "#666"} />
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
          {entries.length} nhật ký
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <View style={styles.filterContainer}>
          <Chip
            selected={filterStatus === null}
            onPress={() => onFilterStatusChange(null)}
            style={[
              styles.filterChip,
              filterStatus === null && styles.selectedChip,
            ]}
            textStyle={filterStatus === null && styles.selectedChipText}
            icon={
              filterStatus === null
                ? renderIcon(ICONS_NAME.CHECK, null)
                : undefined
            }
          >
            {DIARY_TEXTS.STATUS.ALL}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.COMPLETED}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.COMPLETED)}
            style={[
              styles.filterChip,
              filterStatus === DIARY_TEXTS.STATUS.COMPLETED &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === DIARY_TEXTS.STATUS.COMPLETED &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.CHECK_CIRCLE,
              DIARY_TEXTS.STATUS.COMPLETED
            )}
          >
            {DIARY_TEXTS.STATUS.COMPLETED}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.IN_PROGRESS}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.IN_PROGRESS)}
            style={
              (styles.filterChip,
              filterStatus === DIARY_TEXTS.STATUS.IN_PROGRESS &&
                styles.selectedChip)
            }
            textStyle={
              filterStatus === DIARY_TEXTS.STATUS.IN_PROGRESS &&
              styles.selectedChipText
            }
            icon={renderIcon(ICONS_NAME.CLOCK, DIARY_TEXTS.STATUS.IN_PROGRESS)}
          >
            {DIARY_TEXTS.STATUS.IN_PROGRESS}
          </Chip>
          <Chip
            selected={filterStatus === DIARY_TEXTS.STATUS.NOT_STARTED}
            onPress={() => onFilterStatusChange(DIARY_TEXTS.STATUS.NOT_STARTED)}
            style={[
              styles.filterChip,
              filterStatus === DIARY_TEXTS.STATUS.NOT_STARTED &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === DIARY_TEXTS.STATUS.NOT_STARTED &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.ALERT_CIRCLE,
              DIARY_TEXTS.STATUS.NOT_STARTED
            )}
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
  selectedChip: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    elevation: 2,
  },
  selectedChipText: {
    color: "white",
    // fontWeight: "bold",
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
