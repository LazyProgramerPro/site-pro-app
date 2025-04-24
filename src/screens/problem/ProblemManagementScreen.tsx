import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAppSelector } from "../../redux/store";
import { useAppDispatch } from "../../redux/store";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { getProjects } from "../../redux/slices/projectSlice";
import { Problem } from "../../redux/slices/problemSlice";
import { RootState } from "../../redux/store";
import ProblemEntryItem from "../../components/problem/ProblemEntryItem";
import ProblemListHeader from "../../components/problem/ProblemListHeader";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import EmptyList from "../../components/ui/EmptyList";
import { PROBLEM_TEXTS } from "../../constants/problem";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export default function ProblemManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { problems, selectedProject, selectedConstruction, filterStatus } =
    useAppSelector((state: RootState) => state.problem);
  const loading = useAppSelector((state: RootState) => state.problem.loading);

  const filteredProblems = problems.filter(
    (problem: Problem) => !filterStatus || problem.status === filterStatus
  );

  const handleAddProblem = () => {
    if (selectedProject && selectedConstruction) {
      console.log("Add new problem for:", {
        selectedProject,
        selectedConstruction,
      });
    }
  };

  const handleAddPress = () => {
    if (!selectedProject || !selectedConstruction) {
      Alert.alert(
        "Yêu cầu bắt buộc",
        "Vui lòng chọn dự án và công trình trước khi thêm vấn đề."
      );
      return;
    }
    navigation.navigate("AddProblem", {
      projectId: selectedProject?.id ?? null,
      constructionId: selectedConstruction?.id ?? null,
    });
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const renderItem = ({ item }: { item: Problem }) => (
    <ProblemEntryItem item={item} />
  );

  const renderEmptyList = () => (
    <EmptyList
      message={
        !selectedProject
          ? PROBLEM_TEXTS.PLEASE_SELECT_PROJECT
          : !selectedConstruction
          ? PROBLEM_TEXTS.PLEASE_SELECT_CONSTRUCTION
          : PROBLEM_TEXTS.NO_PROBLEM
      }
    />
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Danh sách vấn đề"
          onAddPress={() => {
            handleAddPress();
          }}
        />
        {loading && (
          <LoadingOverlay message={ACCEPTANCE_REQUEST_TEXTS.LOADING_DATA} />
        )}
        <FlatList
          data={selectedProject && selectedConstruction ? filteredProblems : []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => <ProblemListHeader />}
          ListEmptyComponent={renderEmptyList}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#757575",
  },
});
