import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, LayoutChangeEvent, Platform } from "react-native";
import { List, Menu, TouchableRipple } from "react-native-paper";

interface DiaryFieldSelectorProps {
  title: string;
  icon: string;
  items: string[];
  selectedItem?: string;
  onSelect: (item: string) => void;
}

export default function DiaryFieldSelector({
  title,
  icon,
  items,
  selectedItem,
  onSelect,
}: DiaryFieldSelectorProps) {
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

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View ref={anchorRef} onLayout={onLayout}>
            <TouchableRipple onPress={openMenu}>
              <List.Item
                title={selectedItem || title}
                left={(props) => <List.Icon {...props} icon={icon} />}
                right={(props) => <List.Icon {...props} icon="chevron-down" />}
                style={styles.selector}
              />
            </TouchableRipple>
          </View>
        }
        contentStyle={[
          { width: anchorWidth },
          Platform.OS === "android"
            ? { marginTop: anchorHeight + 34 }
            : { marginTop: anchorHeight },
        ]}
      >
        {items.map((item) => (
          <Menu.Item
            key={item}
            onPress={() => {
              onSelect(item);
              closeMenu();
            }}
            title={item}
            leadingIcon={selectedItem === item ? "check" : undefined}
          />
        ))}
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
});
