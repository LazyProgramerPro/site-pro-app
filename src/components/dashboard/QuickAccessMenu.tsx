import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

type MenuItem = {
  label: string;
  icon: string;
  color: string;
  name: string;
};

type QuickAccessMenuProps = {
  menuItems: MenuItem[];
  onMenuItemPress: (screenName: string) => void;
};

const QuickAccessMenu = ({
  menuItems,
  onMenuItemPress,
}: QuickAccessMenuProps) => {
  const theme = useTheme();

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onMenuItemPress(item.name)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.menuSurface, { backgroundColor: theme.colors.surface }]}
      >
        <View
          style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={32}
            color={item.color}
          />
        </View>
        <Text style={[styles.menuLabel, { color: item.color }]}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.label}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={[styles.gridContainer, { padding: 8 }]}
      columnWrapperStyle={{ gap: 12 }}
    />
  );
};

const { width } = Dimensions.get("window");
const itemSize = width / 3 - 16;

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 12,
    gap: 8,
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 0,
  },
  menuSurface: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 16,
  },
});

export default QuickAccessMenu;
