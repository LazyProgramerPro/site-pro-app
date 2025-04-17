import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DiaryEmptyList from "../components/diary/DiaryEmptyList";
import DiaryEntryItem, { DiaryEntry } from "../components/diary/DiaryEntryItem";
import DiaryListHeader from "../components/diary/DiaryListHeader";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import {
  deleteEntry,
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
} from "../redux/slices/diarySlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

export default function DiaryManagementScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {
    projects,
    constructions,
    entries,
    selectedProject,
    selectedConstruction,
    filterStatus,
  } = useAppSelector((state: RootState) => state.diary);
  const [selectedItem, setSelectedItem] = useState<DiaryEntry | null>(null);
  const [visibleItemMenu, setVisibleItemMenu] = useState<string | null>(null);

  const filteredEntries = entries.filter(
    (entry: DiaryEntry) => !filterStatus || entry.status === filterStatus
  );

  const handleProjectSelect = (project: string) => {
    dispatch(setSelectedProject(project));
  };

  const handleConstructionSelect = (construction: string) => {
    dispatch(setSelectedConstruction(construction));
  };

  const handleAddEntry = () => {
    if (selectedProject && selectedConstruction) {
      console.log("Add new entry for:", {
        selectedProject,
        selectedConstruction,
      });
    }
  };

  const handleViewPress = (item: DiaryEntry) => {
    console.log("View item:", item);
  };

  const handleEditPress = (item: DiaryEntry) => {
    console.log("Edit item:", item);
  };

  const handleDeletePress = (item: DiaryEntry) => {
    dispatch(deleteEntry(item.id));
  };

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryEntryItem
      item={item}
      selectedItem={selectedItem}
      onSelect={setSelectedItem}
      visibleItemMenu={visibleItemMenu}
      onMenuPress={setVisibleItemMenu}
      onMenuDismiss={() => setVisibleItemMenu(null)}
      onViewPress={handleViewPress}
      onEditPress={handleEditPress}
      onDeletePress={handleDeletePress}
    />
  );

  const renderEmptyList = () => (
    <DiaryEmptyList
      message={
        !selectedProject
          ? "Vui lòng chọn dự án để xem nhật ký"
          : !selectedConstruction
          ? "Vui lòng chọn công trình để xem nhật ký"
          : "Không có nhật ký nào"
      }
    />
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Danh sách nhật ký" onAddPress={() => {}} />
        <FlatList
          data={selectedProject && selectedConstruction ? filteredEntries : []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <DiaryListHeader
              selectedProject={selectedProject}
              selectedConstruction={selectedConstruction}
              projects={projects}
              constructions={constructions}
              onProjectSelect={handleProjectSelect}
              onConstructionSelect={handleConstructionSelect}
              filterStatus={filterStatus}
              onFilterStatusChange={(status) =>
                dispatch(setFilterStatus(status))
              }
              entryCount={filteredEntries.length}
            />
          )}
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
});
