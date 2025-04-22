import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProjectItem from "../../components/project/ProjectItem";
import EmptyList from "../../components/ui/EmptyList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { GlobalStyles } from "../../constants/styles";
import { getProjects } from "../../redux/slices/projectSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

export default function ProjectScreen() {
  const navigation = useNavigation();
  const { loading, projectList } = useAppSelector(
    (state: RootState) => state.project
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const renderEmptyList = () => <EmptyList />;

  const renderItem = ({ item }: { item: any }) => <ProjectItem item={item} />;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Danh sách dự án" />
        {/* Project List */}

        {loading && (
          <LoadingOverlay
            message="Đang tải dữ liệu..."
            spinnerColor={GlobalStyles.colors.primary500}
            spinnerSize="large"
          />
        )}

        <FlatList
          data={projectList ?? []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
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
    backgroundColor: GlobalStyles.colors.white,
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
    color: GlobalStyles.colors.gray700,
  },
});
