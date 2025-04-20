import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import DiaryEntryItem from "../components/diary/DiaryEntryItem";
import DiaryListHeader from "../components/diary/DiaryListHeader";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import type { DiaryEntry } from "../redux/slices/diarySlice";
import { deleteDiaryEntry } from "../redux/slices/diarySlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { ACCEPTANCE_REQUEST_TEXTS } from "../constants/acceptance-request";
import LoadingOverlay from "../components/ui/LoadingOverlay";
export default function DiaryManagementScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { entries, selectedProject, selectedConstruction, filterStatus } =
    useAppSelector((state: RootState) => state.diary);
  const loading = useAppSelector((state: RootState) => state.diary.loading);
  const [selectedItem, setSelectedItem] = useState<DiaryEntry | null>(null);
  const [visibleItemMenu, setVisibleItemMenu] = useState<number | null>(null);

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

  const handleViewPress = (item: DiaryEntry) => {
    console.log("View item:", item);
  };

  const handleEditPress = (item: DiaryEntry) => {
    console.log("Edit item:", item);
  };

  const handleDeletePress = (item: DiaryEntry) => {
    dispatch(deleteDiaryEntry(item.id));
  };

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <DiaryEntryItem item={item} />
  );

  const renderEmptyList = () => <></>;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Danh sách nhật ký" onAddPress={() => {}} />
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
