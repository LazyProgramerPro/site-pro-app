import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import AcceptanceRequestItem from "../components/acceptance-request/AcceptanceRequestItem";
import AcceptanceRequestListHeader from "../components/acceptance-request/AcceptanceRequestListHeader";
import AcceptanceRequestEmptyList from "../components/diary/DiaryEmptyList";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../constants/acceptance-request";
import {
  AcceptanceRequest,
  deleteAcceptanceRequest,
  getAcceptanceRequestList,
  setFilterStatus,
  setSelectedConstruction,
  setSelectedProject,
} from "../redux/slices/acceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

export default function AcceptanceRequestScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const {
    projects,
    constructions,
    loading: isLoadingFromRedux,
    editingAcceptanceRequest,
    acceptanceRequestList,
    selectedProject,
    selectedConstruction,
    filterStatus,
  } = useAppSelector((state: RootState) => state.acceptanceRequest);

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AcceptanceRequest | null>(
    null
  );
  const [visibleItemMenu, setVisibleItemMenu] = useState<string | null>(null);

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const promise = dispatch(getAcceptanceRequestList());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const filteredEntries = acceptanceRequestList.filter(
    (acceptanceRequest: AcceptanceRequest) =>
      !filterStatus || acceptanceRequest.status === filterStatus
  );

  const handleProjectSelect = (project: string) => {
    dispatch(setSelectedProject(project));
  };

  const handleConstructionSelect = (construction: string) => {
    dispatch(setSelectedConstruction(construction));
  };

  const handleAddAcceptanceRequest = () => {
    if (selectedProject && selectedConstruction) {
      console.log("Add new Acceptance request for:", {
        selectedProject,
        selectedConstruction,
      });
    }
  };

  const handleViewPressAcceptanceRequest = (item: AcceptanceRequest) => {
    console.log("View item:", item);
  };

  const handleEditPressAcceptanceRequest = (item: AcceptanceRequest) => {
    console.log("Edit item:", item);
  };

  const handleDeletePressAcceptanceRequest = (item: AcceptanceRequest) => {
    dispatch(deleteAcceptanceRequest(Number(item.id)));
  };

  const renderItem = ({ item }: { item: AcceptanceRequest }) => (
    <AcceptanceRequestItem
      item={item}
      selectedItem={selectedItem}
      onSelect={setSelectedItem}
      visibleItemMenu={visibleItemMenu}
      onMenuPress={setVisibleItemMenu}
      onMenuDismiss={() => setVisibleItemMenu(null)}
      onViewPress={handleViewPressAcceptanceRequest}
      onEditPress={handleEditPressAcceptanceRequest}
      onDeletePress={handleDeletePressAcceptanceRequest}
    />
  );

  const renderEmptyList = () => (
    <AcceptanceRequestEmptyList
      message={
        !selectedProject
          ? ACCEPTANCE_REQUEST_TEXTS.PLEASE_SELECT_PROJECT
          : !selectedConstruction
          ? ACCEPTANCE_REQUEST_TEXTS.PLEASE_SELECT_CONSTRUCTION
          : ACCEPTANCE_REQUEST_TEXTS.NO_ACCEPTANCE_REQUESTS
      }
    />
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title={ACCEPTANCE_REQUEST_TEXTS.NAME}
          onAddPress={() => {}}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>
              {ACCEPTANCE_REQUEST_TEXTS.LOADING_DATA}
            </Text>
          </View>
        ) : (
          <FlatList
            data={
              selectedProject && selectedConstruction ? filteredEntries : []
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={() => (
              <AcceptanceRequestListHeader
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
        )}
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
