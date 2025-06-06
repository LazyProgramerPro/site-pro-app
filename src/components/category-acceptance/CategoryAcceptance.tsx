import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { IconButton, TextInput } from "react-native-paper";
import { DashboardStackParamList } from "../../navigation/stacks/DashboardStack";
import { changeCategoryAcceptance } from "../../redux/slices/formAcceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
interface ChecklistItem {
  id: string;
  description: string;
}

export default function CategoryAcceptance() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const dispatch = useAppDispatch();

  const [acceptanceCategory, setAcceptanceCategory] = useState("");
  const [constructionWork, setConstructionWork] = useState("");
  const [measurementValue, setMeasurementValue] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("km");

  const { categoryAcceptance } = useAppSelector(
    (state: RootState) => state.acceptanceRequestSpecialForm.data
  );

  // Example checklists for category 2 and 3
  // const { checklists = [] } = categoryAcceptance; // TODO: something wrong with checklists

  const checklists = categoryAcceptance ?? [];

  // Example acceptance categories
  const acceptanceCategories = [
    {
      label: "Nghiệm thu công việc/hạng mục công việc xây dựng",
      value: "1",
    },
    { label: "Nghiệm thu hoàn thành hạng mục", value: "2" },
    { label: "Nghiệm thu hoàn thành công trình", value: "3" },
  ];

  const handleCategoryChange = (item: any) => {
    setAcceptanceCategory(item.value);
    dispatch(
      changeCategoryAcceptance({
        value: item.value,
        checklists: [],
      })
    );
  };

  const handleConstructionWorkChange = (value: string) => {
    setConstructionWork(value);
    dispatch(
      changeCategoryAcceptance({
        value,
        checklists: [],
      })
    );
  };

  const handleMeasurementValueChange = (value: string) => {
    setMeasurementValue(value);
    dispatch(
      changeCategoryAcceptance({
        value,
        checklists: [],
      })
    );
  };

  const handleMeasurementUnitChange = (value: string) => {
    setMeasurementUnit(value);
    dispatch(
      changeCategoryAcceptance({
        value,
        checklists: [],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Acceptance Category Dropdown */}
      <View style={styles.inputWrapper}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={acceptanceCategories}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Chọn loại nghiệm thu"
          value={acceptanceCategory}
          onChange={handleCategoryChange}
        />
      </View>
      {acceptanceCategory === "1" ? (
        <>
          {/* Construction Work */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Công việc xây dựng</Text>
            <TextInput
              style={styles.textInput}
              value={constructionWork}
              onChangeText={handleConstructionWorkChange}
              placeholder="Thi Công xây lắp"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#2196F3"
              left={<TextInput.Icon icon="hammer" color="#666" />}
            />
          </View>

          {/* Measurement Value and Unit - Side by Side */}
          <View style={styles.measurementContainer}>
            <View style={styles.valueContainer}>
              <Text style={styles.inputLabel}>Giá trị</Text>
              <TextInput
                style={styles.valueInput}
                value={measurementValue}
                onChangeText={handleMeasurementValueChange}
                placeholder="10"
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#ddd"
                activeOutlineColor="#2196F3"
              />
            </View>

            <View style={styles.unitContainer}>
              <Text style={styles.inputLabel}>Đơn vị</Text>
              <TextInput
                style={styles.unitInput}
                value={measurementUnit}
                onChangeText={handleMeasurementUnitChange}
                placeholder="km"
                mode="outlined"
                outlineColor="#ddd"
                activeOutlineColor="#2196F3"
              />
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Header with title and add button */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Chọn danh mục nghiệm thu</Text>
            <TouchableOpacity style={styles.addButtonHeader}>
              <IconButton
                icon="plus"
                size={24}
                iconColor="#2196F3"
                onPress={() => {
                  // Handle add button press here
                  console.log("Add button pressed");
                  navigation.navigate("CategoryAcceptance", {
                    categoryId: acceptanceCategory,
                  });
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Column Headers */}
          <View style={styles.columnHeaders}>
            <Text style={styles.columnHeaderText}>Mã</Text>
            <Text style={[styles.columnHeaderText, styles.descriptionHeader]}>
              Mô tả
            </Text>
          </View>

          {/* Checklist Items */}
          {checklists.map(
            (
              item: any,
              index: number // TODO: check list item
            ) => (
              <View key={index} style={styles.checklistItem}>
                <Text
                  style={styles.checklistCode}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.id}
                </Text>
                <Text style={styles.checklistDescription}>
                  {item.description}
                </Text>
              </View>
            )
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // padding: 16,
    // borderRadius: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#333",
  },
  addButtonHeader: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaders: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  columnHeaderText: {
    flex: 1,
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  descriptionHeader: {
    flex: 1,
    textAlign: "right",
  },
  checklistItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  checklistCode: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  checklistDescription: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    textAlign: "right",
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    height: 50,
  },
  measurementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  valueContainer: {
    flex: 2,
    marginRight: 12,
  },
  unitContainer: {
    flex: 1,
  },
  valueInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    height: 50,
  },
  unitInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    height: 50,
  },
});
