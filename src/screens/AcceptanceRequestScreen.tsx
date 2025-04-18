import { FlatList, StyleSheet, View } from "react-native";
import AcceptanceRequestItem from "../components/acceptance-request/AcceptanceRequestItem";
import AcceptanceRequestListHeader from "../components/acceptance-request/AcceptanceRequestListHeader";
import EmptyList from "../components/ui/EmptyList";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../constants/acceptance-request";
import { AcceptanceRequest } from "../redux/slices/acceptanceRequestSlice";
import { RootState, useAppSelector } from "../redux/store";

export default function AcceptanceRequestScreen() {
  const {
    loading,
    acceptanceRequestList,
    selectedProject,
    selectedConstruction,
  } = useAppSelector((state: RootState) => state.acceptanceRequest);

  const renderItem = ({ item }: { item: AcceptanceRequest }) => (
    <AcceptanceRequestItem item={item} />
  );

  const renderEmptyList = () => (
    <EmptyList
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

        {loading && (
          <LoadingOverlay message={ACCEPTANCE_REQUEST_TEXTS.LOADING_DATA} />
        )}

        <FlatList
          data={
            selectedProject && selectedConstruction ? acceptanceRequestList : []
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => <AcceptanceRequestListHeader />}
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
