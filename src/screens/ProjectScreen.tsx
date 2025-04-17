import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, List, Menu, Surface } from "react-native-paper";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";

const projects = [
  {
    id: 1,
    name: "Xây dựng tuyến đường 01",
    description: "Dự án kiểm thử",
  },
];

export default function ProjectScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = (projectId: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setSelectedProjectId(projectId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedProjectId(null);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "edit":
        // Handle edit action
        console.log("Edit project", selectedProjectId);
        break;
      case "delete":
        // Handle delete action
        console.log("Delete project", selectedProjectId);
        break;
      case "share":
        // Handle share action
        console.log("Share project", selectedProjectId);
        break;
    }
    closeMenu();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Danh sách dự án" />
        {/* Project List */}
        <Surface style={styles.listContainer} elevation={1}>
          {projects.map((project) => (
            <List.Item
              key={project.id}
              title={project.name}
              description={project.description}
              left={(props) => <List.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  icon="dots-vertical"
                  onPress={(event) => openMenu(project.id, event)}
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
            onPress={() => handleMenuAction("share")}
            title="Chia sẻ"
            leadingIcon="share"
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
