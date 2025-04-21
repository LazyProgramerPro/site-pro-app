import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import BottomSheetPopup from "../../components/ui/BottomSheetPopup";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import { useAppDispatch } from "../../redux/store";
import { changeCategoryAcceptance } from "../../redux/slices/formAcceptanceRequestSlice";

interface ChecklistItem {
  id: string;
  projectName: string;
  contractType: string;
  description: string;
  checked: boolean;
}

const ACTIONS = {
  SELECTED: "selected",
  VIEW: "view",
  DELETE: "delete",
};

export default function CategoryAcceptanceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [backConfirmVisible, setBackConfirmVisible] = useState(false);

  const dispatch = useAppDispatch();

  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "CHECKLIST-1733456435080",
      projectName: "Dự án: Xây dựng tuyến đường 01...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Mmmmm",
      checked: false,
    },
    {
      id: "CHECKLIST-1732247566071",
      projectName: "Dự án: Xây dựng tuyến đường 02...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Gạch",
      checked: false,
    },
    {
      id: "CHECKLIST-1732183079163",
      projectName: "Dự án: Xây dựng tuyến đường 03...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Duc test",
      checked: false,
    },
    {
      id: "CHECKLIST-1732077484377",
      projectName: "Dự án: Xây dựng tuyến đường 04...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Duc test 123123",
      checked: false,
    },
    {
      id: "CHECKLIST-1733456435081",
      projectName: "Dự án: Xây dựng tuyến đường 05...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: ABC",
      checked: false,
    },
    {
      id: "CHECKLIST-1732247566072",
      projectName: "Dự án: Xây dựng tuyến đường 06...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: DEF",
      checked: false,
    },
    {
      id: "CHECKLIST-1732183079164",
      projectName: "Dự án: Xây dựng tuyến đường 07...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: GHI",
      checked: false,
    },
    {
      id: "CHECKLIST-1732077484378",
      projectName: "Dự án: Xây dựng tuyến đường 08...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: JKL",
      checked: false,
    },
    {
      id: "CHECKLIST-1733456435082",
      projectName: "Dự án: Xây dựng tuyến đường 09...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: MNO",
      checked: false,
    },
    {
      id: "CHECKLIST-1732247566073",
      projectName: "Dự án: Xây dựng tuyến đường 10...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: PQR",
      checked: false,
    },
    {
      id: "CHECKLIST-1732183079165",
      projectName: "Dự án: Xây dựng tuyến đường 11...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: STU",
      checked: false,
    },
    {
      id: "CHECKLIST-1732077484379",
      projectName: "Dự án: Xây dựng tuyến đường 12...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: VWX",
      checked: false,
    },
    {
      id: "CHECKLIST-1733456435083",
      projectName: "Dự án: Xây dựng tuyến đường 13...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: YZ",
      checked: false,
    },
    {
      id: "CHECKLIST-1732247566074",
      projectName: "Dự án: Xây dựng tuyến đường 14...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Alpha",
      checked: false,
    },
    {
      id: "CHECKLIST-1732183079166",
      projectName: "Dự án: Xây dựng tuyến đường 15...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Beta",
      checked: false,
    },
    {
      id: "CHECKLIST-1732077484380",
      projectName: "Dự án: Xây dựng tuyến đường 16...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Gamma",
      checked: false,
    },
    {
      id: "CHECKLIST-1733456435084",
      projectName: "Dự án: Xây dựng tuyến đường 17...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Delta",
      checked: false,
    },
    {
      id: "CHECKLIST-1732247566075",
      projectName: "Dự án: Xây dựng tuyến đường 18...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Epsilon",
      checked: false,
    },
    {
      id: "CHECKLIST-1732183079167",
      projectName: "Dự án: Xây dựng tuyến đường 19...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Zeta",
      checked: false,
    },
    {
      id: "CHECKLIST-1732077484381",
      projectName: "Dự án: Xây dựng tuyến đường 20...",
      contractType: "Hợp đồng: Thi Công xây lắp",
      description: "Mô tả: Eta",
      checked: false,
    },
  ]);

  const toggleCheckbox = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // TODO: Data checked from redux store

  const selectedItems = items.filter((item) => item.checked);

  const removeSelected = (id: string) => {
    toggleCheckbox(id);
  };

  const showMenu = (id: string, event: any) => {
    const { pageX, pageY, width, height } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY, width, height });
    setActiveItemId(id);
    setMenuVisible(true);
  };

  const handleMenuAction = (action: string) => {
    if (!activeItemId) return;

    switch (action) {
      case ACTIONS.VIEW:
        console.log("View item", activeItemId);
        navigation.navigate("CategoryAcceptanceDetails", {});
        break;
      case ACTIONS.SELECTED:
        console.log("View item", activeItemId);
        toggleCheckbox(activeItemId);
        break;
      case ACTIONS.DELETE:
        setItems(items.filter((item) => item.id !== activeItemId));
        break;
    }

    setMenuVisible(false);
    setActiveItemId(null);
  };

  const getDescriptionName = (description: string) => {
    const namePart = description.split(":")[1]?.trim();
    return namePart || description;
  };

  const renderItem = ({ item }: { item: ChecklistItem }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => showMenu(item.id, { nativeEvent: { pageX: 0, pageY: 0 } })}
    >
      <Card
        style={[styles.card, item.checked && styles.cardChecked]}
        mode="outlined"
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={item.checked ? "checked" : "unchecked"}
              onPress={() => toggleCheckbox(item.id)}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.idText}>{item.id}</Text>
            <Text style={styles.projectText}>{item.projectName}</Text>
            <Text style={styles.contractText}>{item.contractType}</Text>
            <Text
              style={[styles.descriptionText, { color: theme.colors.error }]}
            >
              {item.description}
            </Text>
          </View>
          <IconButton
            icon="dots-vertical"
            size={20}
            onPress={(event) => showMenu(item.id, event)}
            style={styles.menuButton}
            rippleColor={theme.colors.primaryContainer}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const handleConfirmBackPress = () => {
    console.log("Back button pressed");
    // If there are selected items, show confirmation modal
    if (selectedItems.length > 0) {
      setBackConfirmVisible(true);
    } else {
      // If no items are selected, just go back
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Danh sách nghiệm thu"
          onBackPress={() => handleConfirmBackPress()}
          onAddPress={() => navigation.navigate("AddCategoryAcceptance", {})}
        />

        {selectedItems.length > 0 && (
          <View style={styles.chipsContainer}>
            <Text style={styles.chipSectionTitle}>
              Danh sách đã chọn ({selectedItems.length})
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsScrollContent}
            >
              {selectedItems.map((item) => (
                <Chip
                  key={item.id}
                  style={styles.chip}
                  icon="check"
                  onClose={() => removeSelected(item.id)}
                  mode="flat"
                  elevation={1}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      surface: theme.colors.primaryContainer,
                      onSurface: theme.colors.onPrimaryContainer,
                    },
                  }}
                  textStyle={styles.chipText}
                >
                  {getDescriptionName(item.description)}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}

        <Divider style={styles.divider} />

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />

        <BottomSheetPopup
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          title="Tùy chọn"
          selectedAction={{
            icon: ICONS_NAME.SELECTED,
            label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.SELECTED,
            onPress: () => handleMenuAction(ACTIONS.SELECTED),
          }}
          viewAction={{
            icon: ICONS_NAME.VIEW,
            label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.VIEW,
            onPress: () => handleMenuAction(ACTIONS.VIEW),
          }}
          deleteAction={{
            icon: ICONS_NAME.DELETE,
            label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.DELETE,
            onPress: () => handleMenuAction(ACTIONS.DELETE),
          }}
        />

        {/* Back Confirmation Modal */}
        <Portal>
          <Modal
            visible={backConfirmVisible}
            onDismiss={() => setBackConfirmVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <IconButton
                  icon="alert-circle-outline"
                  size={48}
                  iconColor={theme.colors.primary}
                />
              </View>

              <Text style={styles.modalTitle}>Xác nhận</Text>
              <Text style={styles.modalDescription}>
                Bạn đã chọn {selectedItems.length} mục. Bạn có chắc chắn muốn
                quay lại không?
              </Text>

              <View style={styles.selectedItemsPreview}>
                <Text style={styles.previewTitle}>Các mục đã chọn:</Text>
                <View style={styles.previewItemsContainer}>
                  {selectedItems.slice(0, 3).map((item, index) => (
                    <Text key={item.id} style={styles.previewItem}>
                      • {getDescriptionName(item.description)}
                    </Text>
                  ))}
                  {selectedItems.length > 3 && (
                    <Text style={styles.previewItem}>
                      • Và {selectedItems.length - 3} mục khác...
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setBackConfirmVisible(false)}
                  style={styles.cancelButton}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Hủy
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    setBackConfirmVisible(false);
                    dispatch(changeCategoryAcceptance(selectedItems));
                    navigation.goBack(); // TODO: Push data into redux store acceptanceRequestSpecialForm
                  }}
                  style={styles.confirmButton}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Quay lại
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chipsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chipSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#424242",
  },
  chipsScrollContent: {
    paddingVertical: 4,
    paddingRight: 16,
    alignItems: "center", // Center chips vertically in scroll view
    minHeight: 48, // Ensure consistent height
  },
  chip: {
    marginRight: 12,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 8, // Slightly increase horizontal padding
    alignItems: "center", // Center content vertically
    justifyContent: "center", // Ensure content is centered horizontally
  },
  chipText: {
    fontSize: 14,
    marginHorizontal: 4,
    textAlignVertical: "center", // Align text vertically center
    includeFontPadding: false, // Remove extra font padding
    textAlign: "center", // Center text horizontally
    paddingTop: 1, // Fine-tune vertical position
  },
  chipIcon: {
    margin: 0,
    padding: 0,
    alignSelf: "center", // Center icon
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    borderColor: "#e0e0e0",
    elevation: 2,
  },
  cardChecked: {
    backgroundColor: "#f0f7ff",
    borderColor: "#90caf9",
  },
  itemSeparator: {
    height: 12,
  },
  cardContent: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  checkboxContainer: {
    justifyContent: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  idText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 4,
  },
  projectText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#424242",
  },
  contractText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#616161",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  menuButton: {
    alignSelf: "center",
    margin: 0,
    borderRadius: 20,
  },
  menu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    elevation: 6,
    width: 160,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemIcon: {
    margin: 0,
    marginRight: 12,
  },

  // New Modal Styles
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
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#212121",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: "#424242",
    lineHeight: 22,
    textAlign: "center",
  },
  modalIconContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  selectedItemsPreview: {
    backgroundColor: "#f5f7fa",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#424242",
  },
  previewItemsContainer: {
    marginLeft: 4,
  },
  previewItem: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 4,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
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
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
