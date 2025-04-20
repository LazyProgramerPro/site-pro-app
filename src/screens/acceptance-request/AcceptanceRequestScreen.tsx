import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import AcceptanceRequestItem from "../../components/acceptance-request/AcceptanceRequestItem";
import AcceptanceRequestListHeader from "../../components/acceptance-request/AcceptanceRequestListHeader";
import EmptyList from "../../components/ui/EmptyList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { AcceptanceRequest } from "../../redux/slices/acceptanceRequestSlice";
import { RootState, useAppSelector } from "../../redux/store";

export default function AcceptanceRequestScreen() {
  const {
    loading,
    acceptanceRequestList,
    selectedProject,
    selectedConstruction,
  } = useAppSelector((state: RootState) => state.acceptanceRequest);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  // Fixed verification function
  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status ===
      Location.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // TODO: checking getLocationAsync permission by loading

    if (
      locationPermissionInformation?.status === Location.PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationAndNavigate() {
    try {
      const hasPermission = await verifyPermissions();

      if (!hasPermission) {
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Navigate to add screen with location data
      navigation.navigate("AddAcceptanceRequest", {
        projectId: selectedProject?.id ?? null,
        constructionId: selectedConstruction?.id ?? null,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } catch (error) {
      console.error("Lỗi", error);
      Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại.");
    }
  }

  const handleAddPress = () => {
    if (!selectedProject || !selectedConstruction) {
      Alert.alert(
        "Yêu cầu bắt buộc",
        "Vui lòng chọn dự án và công trình trước khi thêm yêu cầu."
      );
      return;
    }

    getLocationAndNavigate();
  };

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

  // TODO: REMOVE ALL STATE WHEN SCREEN UNMOUNTED

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title={ACCEPTANCE_REQUEST_TEXTS.NAME}
          onAddPress={handleAddPress}
        />

        {loading && (
          <LoadingOverlay
            message={ACCEPTANCE_REQUEST_TEXTS.LOADING_DATA}
            spinnerColor="#3498db"
            spinnerSize="large"
          />
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
