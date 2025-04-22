import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import DiaryEntryItem from "../../components/diary/DiaryEntryItem";
import DiaryListHeader from "../../components/diary/DiaryListHeader";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import type { DiaryEntry } from "../../redux/slices/diarySlice";
import { deleteDiaryEntry } from "../../redux/slices/diarySlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getConstructions } from "../../redux/slices/projectSlice";
import { getProjects } from "../../redux/slices/projectSlice";

type NavigationProp = NativeStackNavigationProp<DashboardStackParamList>;

export default function DiaryManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { entries, selectedProject, selectedConstruction, filterStatus } =
    useAppSelector((state: RootState) => state.diary);
  const loading = useAppSelector((state: RootState) => state.diary.loading);

  const filteredEntries = entries.filter(
    (entry: DiaryEntry) => !filterStatus || entry.status === filterStatus
  );

  const handleAddEntry = () => {
    if (selectedProject && selectedConstruction) {
      console.log("Add new entry for:", {
        selectedProject,
        selectedConstruction,
      });
    }
  };

  const handleAddPress = () => {
    if (!selectedProject || !selectedConstruction) {
      Alert.alert(
        "Yêu cầu bắt buộc",
        "Vui lòng chọn dự án và công trình trước khi thêm yêu cầu."
      );
      return;
    }
    navigation.navigate("AddDiary", {
      projectId: selectedProject?.id ?? null,
      constructionId: selectedConstruction?.id ?? null,
    });
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryEntryItem item={item} />
  );

  const renderEmptyList = () => <></>;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Danh sách nhật ký"
          onAddPress={() => {
            handleAddPress();
          }}
        />
        {loading && (
          <LoadingOverlay message={ACCEPTANCE_REQUEST_TEXTS.LOADING_DATA} />
        )}
        <FlatList
          data={selectedProject && selectedConstruction ? filteredEntries : []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => <DiaryListHeader />}
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
