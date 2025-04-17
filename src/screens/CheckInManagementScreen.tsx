import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import ScreenHeader from "../components/ui/ScreenHeader";
import {
  List,
  Text,
  IconButton,
  Surface,
  Menu,
  Button,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const checkIns = [
  {
    id: 1,
    employeeName: "Nguyễn Văn A",
    checkInTime: "08:00",
    checkOutTime: "17:00",
    date: "2024-04-17",
    status: "Đã check-in",
    location: "Công trường A",
  },
];

export default function CheckInManagementScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCheckInId, setSelectedCheckInId] = useState<number | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = (checkInId: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setSelectedCheckInId(checkInId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedCheckInId(null);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "edit":
        // Handle edit action
        console.log("Edit check-in", selectedCheckInId);
        break;
      case "delete":
        // Handle delete action
        console.log("Delete check-in", selectedCheckInId);
        break;
      case "details":
        // Handle view details action
        console.log("View details", selectedCheckInId);
        break;
    }
    closeMenu();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Quản lý check-in" />
        {/* Check-in List */}
        <Surface style={styles.listContainer} elevation={1}>
          {checkIns.map((checkIn) => (
            <List.Item
              key={checkIn.id}
              title={checkIn.employeeName}
              description={`Ngày: ${checkIn.date}\nCheck-in: ${checkIn.checkInTime} | Check-out: ${checkIn.checkOutTime}\nĐịa điểm: ${checkIn.location}\nTrạng thái: ${checkIn.status}`}
              left={(props) => <List.Icon {...props} icon="clock-check" />}
              right={(props) => (
                <IconButton
                  icon="dots-vertical"
                  onPress={(event) => openMenu(checkIn.id, event)}
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
            onPress={() => handleMenuAction("details")}
            title="Xem chi tiết"
            leadingIcon="eye"
          />
          <Menu.Item
            onPress={() => handleMenuAction("edit")}
            title="Chỉnh sửa"
            leadingIcon="pencil"
          />
          <Menu.Item
            onPress={() => handleMenuAction("delete")}
            title="Xóa"
            leadingIcon="delete"
            titleStyle={{ color: "#FF0000" }}
          />
        </Menu>

        <Button
          mode="contained"
          style={styles.addButton}
          onPress={() => {
            // Handle add new check-in
            console.log("Add new check-in");
          }}
        >
          Thêm check-in mới
        </Button>
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
  addButton: {
    margin: 16,
    backgroundColor: "#2196F3",
  },
});
