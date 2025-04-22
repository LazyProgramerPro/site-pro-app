import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ApprovalDialog from "../../components/diary/ApprovalDialog";
import AttachmentSelector from "../../components/diary/AttachmentSelector";
import CapabilityDialog from "../../components/diary/CapabilityDialog";
import CapabilityTable from "../../components/diary/CapabilityTable";
import BottomSheetPopup from "../../components/ui/BottomSheetPopup";
import FieldSelector from "../../components/ui/FieldSelector";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { COMMON_CONSTANTS } from "../../constants/common";
import { DIARY_OPTIONS, DIARY_TEXTS } from "../../constants/diary";
import { GlobalStyles, STATUS_COLORS } from "../../constants/styles";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import {
  addDiaryEntry,
  DiaryEntry,
  updateDiaryEntry,
} from "../../redux/slices/diarySlice";
import { useAppDispatch } from "../../redux/store";
import { DocumentFile } from "../../types/common";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

interface Capability {
  code: string;
  quantity: string;
  type: string;
  workforceQuantity: string;
}

export default function AddDiaryScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { projectId, constructionId, diary } =
    route.params as DashboardStackParamList["AddDiary"];

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isApprovalDialogVisible, setIsApprovalDialogVisible] = useState(false);
  const [diaryId] = useState(
    diary?.id ? `Nhatky-${diary.id}` : `Nhatky-${Date.now()}`
  );
  const [diaryName, setDiaryName] = useState(diary?.title || "");
  const [description, setDescription] = useState(diary?.description || "");
  const [diaryType, setDiaryType] = useState(
    diary?.type?.name || "Nhật ký thi công xây dựng"
  );
  const [safety, setSafety] = useState(diary?.safety?.name || "");
  const [environment, setEnvironment] = useState(
    diary?.environment?.name || ""
  );
  const [weather, setWeather] = useState(diary?.weather || "");
  const [selectedImages, setSelectedImages] = useState<string[] | []>(
    diary?.images || []
  );
  const [selectedDocuments, setSelectedDocuments] = useState<
    DocumentFile[] | []
  >(diary?.supportingDocuments || []);
  const [isCapabilityDialogVisible, setIsCapabilityDialogVisible] =
    useState(false);
  const [capabilities, setCapabilities] = useState<Capability[]>(
    diary?.capacity?.map((cap) => ({
      code: cap.id.toString(),
      quantity: "0", // You might want to add these fields to your diary type
      type: cap.name,
      workforceQuantity: "0",
    })) || []
  );

  const diaryTypes = DIARY_OPTIONS.TYPES;
  const safetyLevels = DIARY_OPTIONS.SAFETY;
  const environmentTypes = DIARY_OPTIONS.ENVIRONMENT;
  const weatherConditions = DIARY_OPTIONS.WEATHER;

  const showCapabilityDialog = () => setIsCapabilityDialogVisible(true);
  const hideCapabilityDialog = () => setIsCapabilityDialogVisible(false);

  const handleAddCapability = (newCapability: Capability) => {
    setCapabilities([...capabilities, newCapability]);
    hideCapabilityDialog();
  };

  const handleDeleteCapability = (index: number) => {
    const newCapabilities = capabilities.filter((_, i) => i !== index);
    setCapabilities(newCapabilities);
  };

  const alertError = (message: string) => {
    Alert.alert("Yêu cầu bắt buộc", message);
  };

  const validateForm = () => {
    if (!diaryName.trim()) {
      alertError("Vui lòng nhập tên nhật ký");
      return false;
    }

    if (!description.trim()) {
      alertError("Vui lòng nhập mô tả nhật ký");
      return false;
    }

    if (!safety) {
      alertError("Vui lòng chọn mức độ an toàn");
      return false;
    }

    if (!environment) {
      alertError("Vui lòng chọn tình trạng môi trường");
      return false;
    }

    if (!weather) {
      alertError("Vui lòng chọn thời tiết");
      return false;
    }

    if (diaryType !== "Nhật ký an toàn lao động" && capabilities.length === 0) {
      alertError("Vui lòng thêm ít nhất một năng lực");
      return false;
    }

    return true;
  };

  const handleOpenMenu = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const diaryData: DiaryEntry = {
      id: diary?.id || Date.now(),
      title: diaryName,
      description,
      type: {
        id: 1, // You might want to get the actual type ID from your options
        name: diaryType,
      },
      capacity: capabilities.map((cap, index) => ({
        id: parseInt(cap.code) || index + 1,
        name: cap.type,
      })),
      safety: {
        id: 1, // You might want to get the actual safety ID from your options
        name: safety,
      },
      environment: {
        id: 1, // You might want to get the actual environment ID from your options
        name: environment,
      },
      weather,
      images: selectedImages.length > 0 ? selectedImages : [],
      date: diary?.date || new Date().toISOString(),
      status: diary?.status || DIARY_TEXTS.STATUS.NOT_STARTED,
      updatedBy: diary?.updatedBy || "Nguyễn Chí Thanh",
      createdBy: diary?.createdBy || "Nguyễn Chí Thanh",
      createdAt: diary?.createdAt || new Date().toISOString(),
      completionDate: diary?.completionDate || "",
      approvedBy: diary?.approvedBy || { id: 0, name: "" },
      approvalDate: diary?.approvalDate || "",
      supportingDocuments: selectedDocuments || [],
      constructionId: constructionId || 0,
      projectId: projectId || 0,
    };

    // Dispatch the appropriate action based on whether we're editing or creating
    if (diary) {
      dispatch(updateDiaryEntry(diaryData));
    } else {
      dispatch(addDiaryEntry(diaryData));
    }

    navigation.goBack();
  };

  const handleSendForApproval = (comment: string) => {
    console.log("Sending for approval with comment:", comment);
    // Add your approval submission logic here
    setIsApprovalDialogVisible(false);
    handleCloseMenu();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thông tin nhật ký"
          onBackPress={() => navigation.goBack()}
          onOpenMenuPress={handleOpenMenu}
        />

        <ScrollView style={styles.formContainer}>
          <TextInput
            value={diaryId}
            mode="outlined"
            style={[styles.input, styles.disabledInput]}
            contentStyle={styles.inputContent}
            disabled
          />

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tên nhật ký</Text>
            <TextInput
              value={diaryName}
              onChangeText={setDiaryName}
              mode="outlined"
              style={styles.input}
              contentStyle={styles.inputContent}
              placeholder="Nhập tên nhật ký"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mô tả nhật ký</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={[styles.input, styles.multilineInput]}
              contentStyle={styles.multilineInputContent}
              placeholder="Nhập mô tả"
            />
          </View>

          <FieldSelector
            title="Loại nhật ký"
            icon="notebook"
            items={diaryTypes}
            selectedItem={diaryType}
            type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
            onSelect={(item) => setDiaryType(item.name)}
          />

          {diaryType !== "Nhật ký an toàn lao động" && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Chọn năng lực</Text>
              <Button
                mode="contained"
                onPress={showCapabilityDialog}
                style={styles.attachmentButton}
                icon="account-hard-hat"
              >
                Thêm năng lực
              </Button>
              <CapabilityTable
                capabilities={capabilities}
                onDelete={handleDeleteCapability}
              />
            </View>
          )}

          <FieldSelector
            title="An toàn"
            icon="shield-check"
            items={safetyLevels}
            selectedItem={safety}
            type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
            onSelect={(item) => setSafety(item.name)}
          />

          <FieldSelector
            title="Môi trường"
            icon="tree"
            items={environmentTypes}
            selectedItem={environment}
            type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
            onSelect={(item) => setEnvironment(item.name)}
          />

          <FieldSelector
            title="Chọn thời tiết"
            icon="weather-cloudy"
            items={weatherConditions}
            selectedItem={weather}
            type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
            onSelect={(item) => setWeather(item.name)}
          />

          <AttachmentSelector
            selectedImages={selectedImages || []}
            documents={selectedDocuments || []}
            onImageSelected={setSelectedImages}
            onDocumentSelected={setSelectedDocuments}
          />
        </ScrollView>

        <BottomSheetPopup
          visible={isMenuVisible}
          onDismiss={handleCloseMenu}
          title=""
          addAction={{
            icon: "content-save",
            label: "Lưu thông tin nhật ký",
            onPress: () => {
              handleSave();
              handleCloseMenu();
            },
          }}
          editAction={{
            icon: "send",
            label: "Gửi duyệt phê duyệt nhật ký",
            onPress: () => {
              if (!validateForm()) {
                return;
              }
              setIsApprovalDialogVisible(true);
            },
          }}
        />

        <CapabilityDialog
          visible={isCapabilityDialogVisible}
          onDismiss={hideCapabilityDialog}
          onSave={handleAddCapability}
        />

        <ApprovalDialog
          visible={isApprovalDialogVisible}
          onDismiss={() => setIsApprovalDialogVisible(false)}
          onApprove={handleSendForApproval}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    height: "100%",
    width: "100%",
  },
  formContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 72,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 48,
  },
  inputContent: {
    paddingVertical: 8,
    height: 48,
  },
  multilineInput: {
    height: 100,
  },
  multilineInputContent: {
    height: 100,
    paddingVertical: 12,
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  addButton: {
    borderRadius: 8,
    height: 48,
  },
  footer: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButton: {
    backgroundColor: STATUS_COLORS.ICON.SELECTED,
  },
  attachmentButton: {
    borderRadius: 8,
  },
  capabilityItem: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginTop: 8,
  },
  snackbar: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    backgroundColor: "#d32f2f",
  },
});
