import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { HelperText, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import { GlobalStyles } from "../../constants/styles";
import { RootState, useAppSelector } from "../../redux/store";
import BottomSheetPopup from "../ui/BottomSheetPopup";

type FormData = {
  requestName: string;
  notes: string;
  location: string;
  city: string;
  date: Date | undefined;
  weather: string;
  approver: string | null;
  nearbyLocation: string | null;
};

interface FormAddEditProps {
  initialValues?: Partial<FormData>;
  openMenu: boolean;
  closeMenuHandler: () => void;
  onSubmitSuccess?: (data: FormData) => void;
}

export default function FormAddEditAcceptionRequest({
  openMenu,
  closeMenuHandler,
  initialValues = {},
  onSubmitSuccess,
}: FormAddEditProps) {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { editingAcceptanceRequest } = useAppSelector(
    (state: RootState) => state.acceptanceRequest
  );

  console.log("editingAcceptanceRequest:", initialValues);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      requestName: "",
      notes: "",
      location: "",
      city: "",
      date: new Date(),
      weather: "",
      approver: null,
      nearbyLocation: null,
      ...initialValues,
    },
  });

  const { categoryAcceptance, files, images } = useAppSelector(
    (state: RootState) => state.acceptanceRequestSpecialForm.data
  );

  const nearbyLocations = [
    { label: "Địa điểm 1", value: "1" },
    { label: "Địa điểm 2", value: "2" },
    { label: "Địa điểm 3", value: "3" },
  ];

  const approversList = [
    { label: "Nguyễn Văn A", value: "1" },
    { label: "Trần Thị B", value: "2" },
    { label: "Lê Văn C", value: "3" },
  ];

  const handleCloseMenu = () => {
    closeMenuHandler();
  };

  const handleAddAcceptanceRequest = async (data: FormData) => {
    // Validate the form data before submission

    //TODO: Merge data form + data from redux store
    const mergedData = {
      ...data,
      categoryAcceptance,
      files,
      images,
    };
    console.log("Merged data:", mergedData);

    try {
      setIsSubmitting(true);

      // Log the actual form data
      console.log("Form submitted with values:", data);

      // Simulate API call with a small delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // After successful submission

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }

      // Close the menu after successful submission
      handleCloseMenu();

      // Optionally reset the form
      // reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formWrapper}>
        {/* Tên yêu cầu */}
        <Controller
          control={control}
          name="requestName"
          rules={{ required: "Tên yêu cầu không được để trống" }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Tên yêu cầu nghiệm thu *"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                error={!!errors.requestName}
                left={<TextInput.Icon icon="format-title" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
                disabled={isSubmitting}
              />
              {errors.requestName && (
                <HelperText
                  type="error"
                  visible={!!errors.requestName}
                  style={styles.errorText}
                >
                  {errors.requestName.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Ghi chú */}
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Ghi chú"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              left={<TextInput.Icon icon="note-text-outline" />}
              style={styles.textarea}
              outlineStyle={styles.inputOutline}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Thời gian */}
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              locale="vi"
              label="Thời gian"
              value={value}
              onChange={onChange}
              inputMode="start"
              style={styles.input}
              mode="outlined"
              placeholder="Chọn ngày giờ"
              presentationStyle="pageSheet"
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Địa điểm */}
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Địa điểm"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              left={<TextInput.Icon icon="map-marker" />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Địa điểm gần */}
        <View style={styles.dropdownContainer}>
          <Controller
            control={control}
            name="nearbyLocation"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                placeholder="Chọn địa điểm gần đây"
                data={nearbyLocations}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <Icon
                    name="place"
                    size={20}
                    color={GlobalStyles.colors.gray700}
                    style={styles.dropdownIcon}
                  />
                )}
                disable={isSubmitting}
              />
            )}
          />
        </View>

        {/* Thành phố */}
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Thành phố"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              left={<TextInput.Icon icon="city" />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Thời tiết */}
        <Controller
          control={control}
          name="weather"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Thời tiết"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              left={<TextInput.Icon icon="weather-partly-cloudy" />}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Người phê duyệt */}
        <View style={styles.dropdownContainer}>
          <Controller
            control={control}
            name="approver"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                placeholder="Chọn người phê duyệt"
                data={approversList}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <Icon
                    name="person"
                    size={20}
                    color={GlobalStyles.colors.gray700}
                    style={styles.dropdownIcon}
                  />
                )}
                disable={isSubmitting}
              />
            )}
          />
        </View>
      </View>

      {/* Bottom Sheet Menu */}
      <BottomSheetPopup
        visible={openMenu}
        onDismiss={handleCloseMenu}
        title="Tùy chọn"
        addAction={{
          icon: ICONS_NAME.SAVE,
          label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.SAVE_ACCEPTANCE_REQUEST,
          onPress: () => handleSubmit(handleAddAcceptanceRequest)(),
        }}
        cancelAction={{
          icon: ICONS_NAME.CANCEL,
          label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.CANCEL,
          onPress: () => handleCloseMenu(),
        }}
      />
    </ScrollView>
  );
}

// Define a consistent input height
const INPUT_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    padding: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    height: INPUT_HEIGHT,
  },
  inputOutline: {
    borderRadius: 4,
  },
  inputContent: {
    paddingVertical: 12,
  },
  textarea: {
    marginBottom: 16,
    backgroundColor: "#fff",
    minHeight: 120,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    height: INPUT_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    paddingHorizontal: 12,
  },
  dropdownPlaceholder: {
    color: "#9e9e9e",
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: "#333",
    fontSize: 16,
    marginLeft: 8,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  errorText: {
    marginTop: -12,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 4,
  },
  submitButtonContent: {
    height: INPUT_HEIGHT - 12,
  },
});
