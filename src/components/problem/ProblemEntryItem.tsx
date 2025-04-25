import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { PROBLEM_TEXTS } from "../../constants/problem";
import { ICONS_NAME } from "../../constants/icon";
import { STATUS_COLORS } from "../../constants/styles";
import {
  cancelEditingProblem,
  deleteProblem,
  Problem,
  startEditingProblem,
} from "../../redux/slices/problemSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CommonCard from "../ui/CommonCard";

interface ProblemEntryItemProps {
  item: Problem;
}

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export default function ProblemEntryItem({ item }: ProblemEntryItemProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { editingProblem, selectedProject, selectedConstruction } =
    useAppSelector((state: RootState) => state.problem);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case PROBLEM_TEXTS.STATUS.COMPLETED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.COMPLETED.TEXT,
        };
      case PROBLEM_TEXTS.STATUS.IN_PROGRESS:
        return {
          icon: ICONS_NAME.CLOCK,
          backgroundColor: STATUS_COLORS.STATUS.IN_PROGRESS.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.IN_PROGRESS.TEXT,
        };
      default:
        return {
          icon: ICONS_NAME.ALERT_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.NOT_STARTED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.NOT_STARTED.TEXT,
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  const handleOpenMenu = (itemId: number) => {
    dispatch(startEditingProblem(itemId));
  };
  const handleCloseMenu = () => {
    dispatch(cancelEditingProblem());
  };

  const handleViewPressProblem = (problem: Problem) => {
    navigation.navigate("ViewProblem", {
      problem: item,
    });
    handleCloseMenu();
  };

  const handleEditPressProblem = (problem: Problem) => {
    navigation.navigate("AddProblem", {
      projectId: selectedProject?.id ?? null,
      constructionId: selectedConstruction?.id ?? null,
      problem: item,
    });
    handleCloseMenu();
  };

  const handleDeletePressProblem = (problem: Problem) => {
    handleCloseMenu();
    dispatch(deleteProblem(problem.id));
  };

  const handleAssignPressProblem = (problem: Problem) => {
    // TODO: Implement assign problem functionality
    handleCloseMenu();
  };

  return (
    <CommonCard
      isSelected={item.id === editingProblem?.id}
      onPress={() => handleViewPressProblem(item)}
      title={item.title}
      onMenuPress={() => handleOpenMenu(item.id)}
      showMenu={editingProblem?.id === item.id}
      onDismissMenu={handleCloseMenu}
      menuActions={{
        viewAction: {
          icon: ICONS_NAME.EYE,
          label: PROBLEM_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressProblem(item),
        },
        editAction: {
          icon: ICONS_NAME.PENCIL,
          label: PROBLEM_TEXTS.ACTIONS.EDIT,
          onPress: () => handleEditPressProblem(item),
        },
        deleteAction: {
          icon: ICONS_NAME.DELETE,
          label: PROBLEM_TEXTS.ACTIONS.DELETE,
          onPress: () => handleDeletePressProblem(item),
        },
      }}
    >
      <View style={styles.contentSection}>
        <Text variant="bodyMedium" style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.itemFooter}>
          <Chip
            style={[
              styles.statusChip,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
            textStyle={{ color: statusStyle.textColor }}
            icon={statusStyle.icon}
          >
            {item.status}
          </Chip>
          <Text variant="bodySmall" style={styles.createdByText}>
            Tạo bởi: {item.createdBy}
          </Text>
        </View>
      </View>
    </CommonCard>
  );
}

const styles = StyleSheet.create({
  contentSection: {
    marginTop: 8,
  },
  description: {
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: "row",
    gap: 8,
  },
  statusChip: {
    height: 32,
  },
  createdByText: {
    marginLeft: 8,
    alignSelf: "center",
  },
});
