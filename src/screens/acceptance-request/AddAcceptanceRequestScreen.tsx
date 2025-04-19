import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";

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

export default function AddAcceptanceRequestScreen() {
  const theme = useTheme();
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const { location, projectId, constructionId } =
    route.params as AddAcceptanceRequestRouteParams;

  const [openMenu, setOpenMenu] = useState(false);

  const openMenuHandler = () => {
    setOpenMenu(true);
  };

  const closeMenuHandler = () => {
    setOpenMenu(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thông tin yêu cầu nghiệm thu"
          onBackPress={() => navigation.goBack()}
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
});
