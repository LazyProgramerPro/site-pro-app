import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

import DocumentPickerComponent from "../../components/acceptance-request/DocumentPicker";
import FormAddEditAcceptionRequest from "../../components/acceptance-request/FormAddEditAcceptionRequest";
import ImagePickerComponent from "../../components/acceptance-request/ImagePicker";
import SectionHeader from "../../components/acceptance-request/SectionHeader";
import StatusCard from "../../components/acceptance-request/StatusCard";
import CategoryAcceptance from "../../components/category-acceptance/CategoryAcceptance";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import {
  AddAcceptanceRequestRouteParams,
  DashboardStackParamList,
} from "../../navigation/stacks/DashboardStack";
import BackConfirmationModal from "../../components/ui/BackConfirmationModal";

export default function AddAcceptanceRequestScreen() {
  const theme = useTheme();
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const { location, projectId, constructionId, editingAcceptanceRequest } =
    route.params as AddAcceptanceRequestRouteParams;

  // TODO: Compare with editingAcceptanceRequest from redux store
  // const { editingAcceptanceRequest } = useAppSelector(
  //   (state: RootState) => state.acceptanceRequest
  // );
  // console.log("location:", location);

  console.log("editingAcceptanceRequest:", editingAcceptanceRequest);

  const [openMenu, setOpenMenu] = useState(false);
  const [backConfirmVisible, setBackConfirmVisible] = useState(false);

  const openMenuHandler = () => {
    setOpenMenu(true);
  };

  const closeMenuHandler = () => {
    setOpenMenu(false);
  };

  const handlePressBack = () => {
    setBackConfirmVisible(true);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thông tin yêu cầu nghiệm thu"
          onBackPress={() => handlePressBack()}
          onOpenMenuPress={() => openMenuHandler()}
        />

        <ScrollView style={styles.formContainer}>
          {/* Status section */}
          <StatusCard />

          {/* Basic Information Section */}
          <SectionHeader
            title="Thông tin cơ bản"
            section="basicInfo"
            icon="information-outline"
          />

          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.sectionContent}
          >
            <FormAddEditAcceptionRequest
              openMenu={openMenu}
              closeMenuHandler={closeMenuHandler}
              initialValues={editingAcceptanceRequest}
            />
          </Animatable.View>

          {/* Media Section */}
          <SectionHeader
            title="Hình ảnh & Media"
            section="media"
            icon="image"
          />

          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.sectionContent}
          >
            <ImagePickerComponent />
          </Animatable.View>

          {/* Categories Section */}
          <SectionHeader
            title="Danh mục nghiệm thu"
            section="categories"
            icon="format-list-bulleted"
          />

          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.sectionContent}
          >
            <CategoryAcceptance />
          </Animatable.View>

          {/* Documents Section */}
          <SectionHeader
            title="Tài liệu đính kèm"
            section="documents"
            icon="file-document-multiple"
          />

          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.sectionContent}
          >
            <DocumentPickerComponent />
          </Animatable.View>
        </ScrollView>

        {/* Back Confirmation Modal */}
        <BackConfirmationModal
          visible={backConfirmVisible}
          onDismiss={() => setBackConfirmVisible(false)}
          onConfirm={() => {
            setBackConfirmVisible(false);
            navigation.goBack();
            // TODO: Handle data from redux store or context
          }}
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
  formContainer: {
    flex: 1,
    padding: 16,
  },
  sectionContent: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
  },

  // Modal styles
  modalContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
  },
  modalContent: {
    padding: 24,
  },
  modalIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: "#424242",
    lineHeight: 24,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: "#e0e0e0",
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
