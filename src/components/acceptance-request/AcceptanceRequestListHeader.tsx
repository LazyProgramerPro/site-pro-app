import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Surface, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Adjust based on your icon library
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
interface RenderIconProps {
  size: number;
}

export default function AcceptanceRequestListHeader() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

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
            style={[
              styles.filterChip,
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.ALL &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.ALL &&
              styles.selectedChipText
            }
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
            style={[
              styles.filterChip,
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.APPROVED &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.APPROVED &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.CHECK_CIRCLE,
              ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.APPROVED
            )}
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
            style={[
              styles.filterChip,
              filterStatus ===
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.IN_PROGRESS &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus ===
                ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.IN_PROGRESS &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.CLOCK,
              ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.IN_PROGRESS
            )}
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
            style={[
              styles.filterChip,
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.PENDING &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.PENDING &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.ALERT_CIRCLE,
              ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.PENDING
            )}
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
            style={[
              styles.filterChip,
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.REJECTED &&
                styles.selectedChip,
            ]}
            textStyle={
              filterStatus === ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.REJECTED &&
              styles.selectedChipText
            }
            icon={renderIcon(
              ICONS_NAME.CANCEL,
              ACCEPTANCE_REQUEST_TEXTS.STATUS_VALUE.REJECTED
            )}
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedChip: {
    backgroundColor: "#3498db",
    borderColor: "#2980b9",
    borderWidth: 1,
    elevation: 2,
  },
  selectedChipText: {
    color: "white",
    fontWeight: "bold",
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
