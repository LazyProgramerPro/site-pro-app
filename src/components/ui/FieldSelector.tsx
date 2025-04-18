import React, { useRef, useState } from "react";
import { LayoutChangeEvent, Platform, StyleSheet, View } from "react-native";
import { List, Menu, TouchableRipple } from "react-native-paper";

interface FieldSelectorProps {
  title: string;
  icon: string;
  items: any[];
  selectedItem?: string;
  onSelect: (item: any) => void;
}

export default function FieldSelector({
  title,
  icon,
  items,
  selectedItem,
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
            key={item.id}
            onPress={() => {
              onSelect(item);
              closeMenu();
            }}
            title={item.name}
            titleStyle={{
              fontSize: 16,
              fontWeight: selectedItem === item.name ? "bold" : "normal",
            }}
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
