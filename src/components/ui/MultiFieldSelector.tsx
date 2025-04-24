import React, { useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import {
  List,
  Menu,
  TouchableRipple,
  Surface,
  Text,
  Chip,
} from "react-native-paper";
import { COMMON_CONSTANTS } from "../../constants/common";
import { GlobalStyles } from "../../constants/styles";

interface MultiFieldSelectorProps {
  title: string;
  icon: string;
  items: any[];
  selectedItems: any[];
  type?: number;
  onSelect: (items: any[]) => void;
}

export default function MultiFieldSelector({
  title,
  icon,
  items,
  selectedItems,
  type = COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_IN_FIELD,
  onSelect,
}: MultiFieldSelectorProps) {
  const [visible, setVisible] = useState(false);
  const [anchorWidth, setAnchorWidth] = useState(0);
  const [anchorHeight, setAnchorHeight] = useState(0);
  const anchorRef = useRef<View>(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onLayout = (event: LayoutChangeEvent) => {
    setAnchorWidth(event.nativeEvent.layout.width);
    setAnchorHeight(event.nativeEvent.layout.height);
  };

  const handleItemSelect = (item: any) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );
    let newSelectedItems;

    if (isSelected) {
      newSelectedItems = selectedItems.filter(
        (selected) => selected.id !== item.id
      );
    } else {
      newSelectedItems = [...selectedItems, item];
    }

    onSelect(newSelectedItems);
  };

  const renderSelector = () => {
    if (type === COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD) {
      return (
        <View style={styles.outFieldContainer}>
          <Text style={styles.outFieldLabel}>{title}</Text>
          <TouchableRipple onPress={openMenu} style={styles.outFieldSelector}>
            <View style={styles.outFieldValue}>
              <View style={styles.chipContainer}>
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <Chip
                      key={item.id}
                      style={styles.chip}
                      onClose={() => handleItemSelect(item)}
                    >
                      {item.name}
                    </Chip>
                  ))
                ) : (
                  <Text style={styles.outFieldText}>--- chọn ---</Text>
                )}
              </View>
              <List.Icon icon="chevron-down" style={styles.outFieldIcon} />
            </View>
          </TouchableRipple>
        </View>
      );
    }

    return (
      <TouchableRipple onPress={openMenu}>
        <List.Item
          title={
            selectedItems.length > 0 ? `${selectedItems.length} đã chọn` : title
          }
          left={(props) => <List.Icon {...props} icon={icon} />}
          right={(props) => <List.Icon {...props} icon="chevron-down" />}
          style={styles.selector}
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View ref={anchorRef} onLayout={onLayout}>
            {renderSelector()}
          </View>
        }
        style={{ height: 200 }}
        contentStyle={[
          {
            width: anchorWidth,
            paddingVertical: 8,
            height: 200,
          },
          Platform.OS === "android"
            ? { marginTop: anchorHeight + 34 }
            : { marginTop: anchorHeight },
        ]}
      >
        <ScrollView style={{ height: 200 }}>
          {items.map((item) => (
            <TouchableRipple
              key={item.id}
              onPress={() => {
                handleItemSelect(item);
              }}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                {selectedItems.some((selected) => selected.id === item.id) && (
                  <List.Icon icon="check" style={styles.checkIcon} />
                )}
                <Text
                  style={[
                    styles.menuItemText,
                    selectedItems.some((selected) => selected.id === item.id) &&
                      styles.selectedMenuItemText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  selector: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  outFieldContainer: {
    width: "100%",
    marginBottom: 16,
  },
  outFieldLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: GlobalStyles.colors.gray700,
  },
  outFieldSelector: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  outFieldValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  outFieldText: {
    fontSize: 16,
    color: "#000",
  },
  outFieldIcon: {
    margin: 0,
  },
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkIcon: {
    margin: 0,
    marginRight: 8,
    color: GlobalStyles.colors.primary500,
  },
  selectedMenuItem: {
    backgroundColor: GlobalStyles.colors.primary100,
  },
  menuItemText: {
    fontSize: 16,
  },
  selectedMenuItemText: {
    fontWeight: "500",
    color: GlobalStyles.colors.primary500,
  },
});
