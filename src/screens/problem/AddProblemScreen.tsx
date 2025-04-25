import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import FieldSelector from "../../components/ui/FieldSelector";
import MultiFieldSelector from "../../components/ui/MultiFieldSelector";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { COMMON_CONSTANTS } from "../../constants/common";
import {
  PROBLEM_TEXTS,
  PROBLEM_TYPES,
  PROBLEM_SOLVERS,
} from "../../constants/problem";
import { GlobalStyles, STATUS_COLORS } from "../../constants/styles";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import {
  addProblem,
  Problem,
  updateProblem,
} from "../../redux/slices/problemSlice";
import { useAppDispatch } from "../../redux/store";
import { DocumentFile } from "../../types/common";
import BottomSheetPopup from "../../components/ui/BottomSheetPopup";
import BackConfirmationModal from "../../components/ui/BackConfirmationModal";
import AttachmentSelector from "../../components/ui/AttachmentSelector";
import SectionHeader from "../../components/acceptance-request/SectionHeader";
import StatusCard from "../../components/acceptance-request/StatusCard";
import * as Animatable from "react-native-animatable";
// Mock data for problem solvers - replace with actual data from your backend

export default function AddProblemScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { projectId, constructionId, problem } =
    route.params as DashboardStackParamList["AddProblem"];

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [problemId] = useState(
    problem?.id ? `VanDe-${problem.id}` : `VanDe-${Date.now()}`
  );
  const [problemName, setProblemName] = useState(problem?.title || "");
  const [description, setDescription] = useState(problem?.description || "");
  const [priority, setPriority] = useState(problem?.priority || "Cao");
  const [status, setStatus] = useState(
    problem?.status || PROBLEM_TEXTS.STATUS.NOT_STARTED
  );
  const [problemType, setProblemType] = useState(problem?.type || "");
  const [selectedSolvers, setSelectedSolvers] = useState<
    { id: number; name: string }[]
  >(problem?.assignedTo ? problem.assignedTo : []);
  const [selectedImages, setSelectedImages] = useState<string[] | []>(
    problem?.images || []
  );
  const [selectedDocuments, setSelectedDocuments] = useState<
    DocumentFile[] | []
  >(problem?.supportingDocuments || []);
  const [showBackConfirmation, setShowBackConfirmation] = useState(false);

  const priorities = ["Cao", "Trung bình", "Thấp"];
  const statuses = [
    PROBLEM_TEXTS.STATUS.NOT_STARTED,
    PROBLEM_TEXTS.STATUS.IN_PROGRESS,
    PROBLEM_TEXTS.STATUS.COMPLETED,
  ];

  const handleOpenMenu = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const validateForm = () => {
    if (!problemName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên vấn đề");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả vấn đề");
      return false;
    }
    if (!problemType) {
      Alert.alert("Lỗi", "Vui lòng chọn loại vấn đề");
      return false;
    }
    if (selectedSolvers.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một người giải quyết");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const problemData: Problem = {
      id: problem?.id || Date.now(),
      title: problemName,
      description,
      status,
      priority,
      type: problemType,
      updatedBy: problem?.updatedBy || "Nguyễn Chí Thanh",
      createdBy: problem?.createdBy || "Nguyễn Chí Thanh",
      createdAt: problem?.createdAt || new Date().toISOString(),
      completionDate: problem?.completionDate || "",
      assignedTo: selectedSolvers || [{ id: 0, name: "" }],
      images: selectedImages.length > 0 ? selectedImages : [],
      supportingDocuments: selectedDocuments || [],
      constructionId: constructionId || 0,
      projectId: projectId || 0,
    };

    // Dispatch the appropriate action based on whether we're editing or creating
    if (problem) {
      dispatch(updateProblem(problemData));
    } else {
      dispatch(addProblem(problemData));
    }

    navigation.goBack();
  };

  const handleBackPress = useCallback(() => {
    setShowBackConfirmation(true);
  }, []);

  const handleConfirmBack = useCallback(() => {
    setShowBackConfirmation(false);
    navigation.goBack();
  }, [navigation]);

  const handleCancelBack = useCallback(() => {
    setShowBackConfirmation(false);
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thông tin vấn đề"
          onBackPress={handleBackPress}
          onOpenMenuPress={handleOpenMenu}
        />

        <ScrollView style={styles.formContainer}>
          {/* {problem && (
            <StatusCard
              status={status}
              username={problem?.updatedBy || "Nguyễn Chí Thanh"}
              statusType={
                status === PROBLEM_TEXTS.STATUS.COMPLETED
                  ? "approved"
                  : status === PROBLEM_TEXTS.STATUS.IN_PROGRESS
                  ? "processing"
                  : "pending"
              }
              timestamp={
                problem?.createdAt
                  ? new Date(problem.createdAt).toLocaleString()
                  : "Hôm nay"
              }
            />
          )} */}

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
            <TextInput
              value={problemId}
              mode="outlined"
              style={[styles.input, styles.disabledInput]}
              contentStyle={styles.inputContent}
              disabled
            />

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Tên vấn đề</Text>
              <TextInput
                value={problemName}
                onChangeText={setProblemName}
                mode="outlined"
                style={styles.input}
                contentStyle={styles.inputContent}
                placeholder="Nhập tên vấn đề"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mô tả vấn đề</Text>
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

            <View style={styles.fieldGroup}>
              <MultiFieldSelector
                title="Người giải quyết"
                icon="account-multiple"
                items={PROBLEM_SOLVERS}
                selectedItems={selectedSolvers}
                type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
                onSelect={setSelectedSolvers}
              />
            </View>

            <View style={styles.fieldGroup}>
              <FieldSelector
                title="Loại vấn đề"
                icon="alert-circle"
                items={PROBLEM_TYPES}
                selectedItem={problemType}
                type={COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD}
                onSelect={(item) => setProblemType(item.name)}
              />
            </View>
          </Animatable.View>
          <SectionHeader
            title="Thông tin đính kèm"
            section="basicInfo"
            icon="file"
          />
          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.sectionContent}
          >
            <AttachmentSelector
              selectedImages={selectedImages}
              documents={selectedDocuments}
              onImageSelected={setSelectedImages}
              onDocumentSelected={setSelectedDocuments}
            />
          </Animatable.View>
        </ScrollView>

        <BottomSheetPopup
          visible={isMenuVisible}
          onDismiss={handleCloseMenu}
          title="Tuỳ chọn"
          addAction={{
            icon: "arrow-right",
            label: "Gửi duyệt yêu cầu giải quyết vấn đề",
            onPress: () => {
              handleSave();
              handleCloseMenu();
            },
          }}
        />

        <BackConfirmationModal
          visible={showBackConfirmation}
          onConfirm={handleConfirmBack}
          onDismiss={handleCancelBack}
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
  snackbar: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    backgroundColor: "#d32f2f",
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  selectorButton: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    backgroundColor: "#fff",
    borderColor: GlobalStyles.colors.gray400,
  },
  textContainer: {
    height: 48,
    justifyContent: "center",
    paddingLeft: 12,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  selectorButtonLabel: {
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
  },
  sectionContent: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
  },
});
