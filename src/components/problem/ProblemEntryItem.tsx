import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { PROBLEM_TEXTS } from "../../constants/problem";
import { ICONS_NAME } from "../../constants/icon";
import { GlobalStyles, STATUS_COLORS } from "../../constants/styles";
import {
  cancelEditingProblem,
  deleteProblem,
  Problem,
  startEditingProblem,
} from "../../redux/slices/problemSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import BottomSheetPopup from "../ui/BottomSheetPopup";
import { useNavigation } from "@react-navigation/native";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    <>
      <Card
        style={[
          styles.card,
          item.id === editingProblem?.id && styles.selectedCard,
        ]}
        onPress={() => handleViewPressProblem(item)}
      >
        <Card.Content>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderLeft}>
              <Icon
                name={ICONS_NAME.ALERT_CIRCLE}
                size={20}
                color={
                  item.id === editingProblem?.id
                    ? STATUS_COLORS.ICON.SELECTED
                    : STATUS_COLORS.ICON.DEFAULT
                }
              />
              <Text
                variant="titleMedium"
                style={
                  item.id === editingProblem?.id
                    ? styles.selectedText
                    : { marginLeft: 8 }
                }
              >
                {item.title}
              </Text>
            </View>
            <IconButton
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={() => handleOpenMenu(item.id)}
            />
          </View>

          <View style={styles.itemContent}>
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
        </Card.Content>
      </Card>

      <BottomSheetPopup
        visible={editingProblem?.id === item.id}
        onDismiss={handleCloseMenu}
        title="Tùy chọn"
        viewAction={{
          icon: ICONS_NAME.EYE,
          label: PROBLEM_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressProblem(item),
        }}
        editAction={{
          icon: ICONS_NAME.PENCIL,
          label: PROBLEM_TEXTS.ACTIONS.EDIT,
          onPress: () => handleEditPressProblem(item),
        }}
        deleteAction={{
          icon: ICONS_NAME.DELETE,
          label: PROBLEM_TEXTS.ACTIONS.DELETE,
          onPress: () => handleDeletePressProblem(item),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    elevation: 2,
    padding: 1,
  },
  selectedCard: {
    borderColor: STATUS_COLORS.ICON.SELECTED,
    borderWidth: 1,
    elevation: 4,
    padding: 0,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectedText: {
    color: STATUS_COLORS.ICON.SELECTED,
    marginLeft: 8,
  },
  itemContent: {
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
  priorityChip: {
    height: 32,
  },
  createdByText: {
    marginLeft: 8,
    alignSelf: "center",
  },
});
