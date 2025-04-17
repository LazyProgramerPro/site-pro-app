import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import ScreenHeader from "../components/ui/ScreenHeader";
import { List, Text, IconButton, Surface, Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const problems = [
  {
    id: 1,
    title: "Vấn đề về thiết bị",
    description: "Máy xúc không hoạt động",
    status: "Đang xử lý",
    priority: "Cao",
  },
];

export default function ProblemManagementScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = (problemId: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setSelectedProblemId(problemId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedProblemId(null);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "edit":
        // Handle edit action
        console.log("Edit problem", selectedProblemId);
        break;
      case "delete":
        // Handle delete action
        console.log("Delete problem", selectedProblemId);
        break;
      case "assign":
        // Handle assign action
        console.log("Assign problem", selectedProblemId);
        break;
    }
    closeMenu();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Quản lý vấn đề" />
        {/* Problem List */}
        <Surface style={styles.listContainer} elevation={1}>
          {problems.map((problem) => (
            <List.Item
              key={problem.id}
              title={problem.title}
              description={`${problem.description}\nTrạng thái: ${problem.status} | Ưu tiên: ${problem.priority}`}
              left={(props) => <List.Icon {...props} icon="alert-circle" />}
              right={(props) => (
                <IconButton
                  icon="dots-vertical"
                  onPress={(event) => openMenu(problem.id, event)}
                />
              )}
              style={styles.listItem}
            />
          ))}
        </Surface>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={menuPosition}
          contentStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <Menu.Item
            onPress={() => handleMenuAction("edit")}
            title="Chỉnh sửa"
            leadingIcon="pencil"
          />
          <Menu.Item
            onPress={() => handleMenuAction("assign")}
            title="Giao việc"
            leadingIcon="account-plus"
          />
          <Menu.Item
            onPress={() => handleMenuAction("delete")}
            title="Xóa"
            leadingIcon="delete"
            titleStyle={{ color: "#FF0000" }}
          />
        </Menu>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "white",
  },
  title: {
    flex: 1,
  },
  listContainer: {
    marginTop: 8,
    backgroundColor: "white",
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
