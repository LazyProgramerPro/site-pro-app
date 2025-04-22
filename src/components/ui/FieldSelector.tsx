import React, { useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { List, Menu, TouchableRipple, Surface, Text } from "react-native-paper";
import { COMMON_CONSTANTS } from "../../constants/common";
import { GlobalStyles } from "../../constants/styles";

interface FieldSelectorProps {
  title: string;
  icon: string;
  items: any[];
  selectedItem?: string;
  type?: number;
  onSelect: (item: any) => void;
}

export default function FieldSelector({
  title,
  icon,
  items,
  selectedItem,
  type = COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_IN_FIELD,
  onSelect,
}: FieldSelectorProps) {
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

  const renderSelector = () => {
    if (type === COMMON_CONSTANTS.FIELD_SELECTOR_TYPE.TEXT_OUT_FIELD) {
      return (
        <View style={styles.outFieldContainer}>
          <Text style={styles.outFieldLabel}>{title}</Text>
          <TouchableRipple onPress={openMenu} style={styles.outFieldSelector}>
            <View style={styles.outFieldValue}>
              <Text style={styles.outFieldText}>
                {selectedItem || "--- chọn ---"}
              </Text>
              <List.Icon icon="chevron-down" style={styles.outFieldIcon} />
            </View>
          </TouchableRipple>
        </View>
      );
    }

    return (
      <TouchableRipple onPress={openMenu}>
        <List.Item
          title={selectedItem || title}
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
        style={{ maxHeight: 300 }}
        contentStyle={[
          {
            width: anchorWidth,
            paddingVertical: 8,
          },
          Platform.OS === "android"
            ? { marginTop: anchorHeight + 34 }
            : { marginTop: anchorHeight },
        ]}
      >
        <ScrollView style={{ maxHeight: 300 }}>
          {items.map((item) => (
            // <View
            //   key={item.id}
            //   style={{ width: anchorWidth, backgroundColor: "blue" }}
            // >
            <TouchableRipple
              key={item.id}
              onPress={() => {
                onSelect(item);
                closeMenu();
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: selectedItem === item.name ? "700" : "400",
                }}
              >
                {item.name}
              </Text>
            </TouchableRipple>
            // </View>
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
});
