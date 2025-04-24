import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Chip, Surface, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { PROBLEM_TEXTS } from "../../constants/problem";
import { ICONS_NAME } from "../../constants/icon";
import {
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
  getProblemList,
} from "../../redux/slices/problemSlice";
import {
  Construction,
  Project,
  getContracts,
} from "../../redux/slices/projectSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import FieldSelector from "../ui/FieldSelector";
import { GlobalStyles } from "../../constants/styles";

interface RenderIconProps {
  size: number;
}

export default function ProblemListHeader() {
  const dispatch = useAppDispatch();
  const {
    selectedProject,
    selectedConstruction,
    problems,
    query: { filterStatus },
  } = useAppSelector((state: RootState) => state.problem);
  const projects = useAppSelector(
    (state: RootState) => state.project.projectList
  );
  const contracts = useAppSelector(
    (state: RootState) => state.project.contracts
  );

  const handleSelectedProject = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(setSelectedConstruction(null)); // Reset construction when project changes
    dispatch(getContracts(project.id)); // Fetch constructions for the selected project
  };

  const fetchProblemList = ({
    construction,
    status,
  }: {
    construction?: Construction;
    status?: string | null;
  }) => {
    dispatch(
      getProblemList({
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
    fetchProblemList({ construction });
  };

  const onFilterStatusChange = (status: string | null) => {
    dispatch(setFilterStatus(status));
    fetchProblemList({ status });
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
              title={"Chọn hợp đồng"}
              icon={ICONS_NAME.CONTRACT}
              items={contracts}
              selectedItem={selectedConstruction?.name || undefined}
              onSelect={handleConstructionSelect}
            />
          </View>
        )}
      </Surface>

      {selectedProject && selectedConstruction && (
        <Text variant="titleMedium" style={styles.listTitle}>
          {problems.length} vấn đề
        </Text>
      )}

      {selectedProject && selectedConstruction && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <Chip
            style={[
              styles.filterChip,
              filterStatus === null && styles.selectedChip,
            ]}
            textStyle={[filterStatus === null && styles.selectedChipText]}
            icon={renderIcon(ICONS_NAME.FILTER, null)}
            onPress={() => onFilterStatusChange(null)}
          >
            {PROBLEM_TEXTS.STATUS.ALL}
          </Chip>
          <Chip
            style={[
              styles.filterChip,
              filterStatus === PROBLEM_TEXTS.STATUS.COMPLETED &&
                styles.selectedChip,
            ]}
            textStyle={[
              filterStatus === PROBLEM_TEXTS.STATUS.COMPLETED &&
                styles.selectedChipText,
            ]}
            icon={renderIcon(
              ICONS_NAME.CHECK_CIRCLE,
              PROBLEM_TEXTS.STATUS.COMPLETED
            )}
            onPress={() => onFilterStatusChange(PROBLEM_TEXTS.STATUS.COMPLETED)}
          >
            {PROBLEM_TEXTS.STATUS.COMPLETED}
          </Chip>
          <Chip
            style={[
              styles.filterChip,
              filterStatus === PROBLEM_TEXTS.STATUS.IN_PROGRESS &&
                styles.selectedChip,
            ]}
            textStyle={[
              filterStatus === PROBLEM_TEXTS.STATUS.IN_PROGRESS &&
                styles.selectedChipText,
            ]}
            icon={renderIcon(
              ICONS_NAME.CLOCK,
              PROBLEM_TEXTS.STATUS.IN_PROGRESS
            )}
            onPress={() =>
              onFilterStatusChange(PROBLEM_TEXTS.STATUS.IN_PROGRESS)
            }
          >
            {PROBLEM_TEXTS.STATUS.IN_PROGRESS}
          </Chip>
          <Chip
            style={[
              styles.filterChip,
              filterStatus === PROBLEM_TEXTS.STATUS.NOT_STARTED &&
                styles.selectedChip,
            ]}
            textStyle={[
              filterStatus === PROBLEM_TEXTS.STATUS.NOT_STARTED &&
                styles.selectedChipText,
            ]}
            icon={renderIcon(
              ICONS_NAME.ALERT_CIRCLE,
              PROBLEM_TEXTS.STATUS.NOT_STARTED
            )}
            onPress={() =>
              onFilterStatusChange(PROBLEM_TEXTS.STATUS.NOT_STARTED)
            }
          >
            {PROBLEM_TEXTS.STATUS.NOT_STARTED}
          </Chip>
        </ScrollView>
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
    paddingVertical: 8,
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
