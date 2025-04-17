import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableRipple onPress={openMenu}>
            <List.Item
              title={selectedItem || title}
              left={(props) => <List.Icon {...props} icon={icon} />}
              right={(props) => <List.Icon {...props} icon="chevron-down" />}
              style={styles.selector}
            />
          </TouchableRipple>
        }
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
