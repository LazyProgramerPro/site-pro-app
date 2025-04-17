import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Menu,
  Surface,
  Text,
} from "react-native-paper";
import ScreenHeader from "../components/ui/ScreenHeader";
import ScreenWrapper from "../components/ui/ScreenWrapper";

const reports = [
  {
    id: 1,
    title: "Báo cáo tiến độ dự án",
    type: "Tiến độ",
    date: "2024-04-17",
    author: "Nguyễn Văn A",
    status: "Đã duyệt",
  },
  {
    id: 2,
    title: "Báo cáo chi phí tháng 4",
    type: "Tài chính",
    date: "2024-04-15",
    author: "Trần Thị B",
    status: "Chờ duyệt",
  },
];

export default function ReportScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = (reportId: number, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setSelectedReportId(reportId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedReportId(null);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "view":
        // Handle view action
        console.log("View report", selectedReportId);
        break;
      case "edit":
        // Handle edit action
        console.log("Edit report", selectedReportId);
        break;
      case "delete":
        // Handle delete action
        console.log("Delete report", selectedReportId);
        break;
      case "download":
        // Handle download action
        console.log("Download report", selectedReportId);
        break;
    }
    closeMenu();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader title="Báo cáo" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Report List */}
          <Surface style={styles.listContainer} elevation={1}>
            {reports.map((report) => (
              <Card key={report.id} style={styles.card}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <Text variant="titleMedium">{report.title}</Text>
                    <IconButton
                      icon="dots-vertical"
                      onPress={(event) => openMenu(report.id, event)}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text variant="bodyMedium">Loại: {report.type}</Text>
                    <Text variant="bodyMedium">Ngày: {report.date}</Text>
                    <Text variant="bodyMedium">Người tạo: {report.author}</Text>
                    <Text variant="bodyMedium">
                      Trạng thái: {report.status}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </Surface>
        </ScrollView>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={menuPosition}
          contentStyle={{ backgroundColor: "#FFFFFF" }}
        >
          <Menu.Item
            onPress={() => handleMenuAction("view")}
            title="Xem báo cáo"
            leadingIcon="eye"
          />
          <Menu.Item
            onPress={() => handleMenuAction("edit")}
            title="Chỉnh sửa"
            leadingIcon="pencil"
          />
          <Menu.Item
            onPress={() => handleMenuAction("download")}
            title="Tải xuống"
            leadingIcon="download"
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
            // Handle create new report
            console.log("Create new report");
          }}
        >
          Tạo báo cáo mới
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12, // Standardized top margin
  },
  listContainer: {
    margin: 8,
    backgroundColor: "transparent",
  },
  card: {
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    marginTop: 8,
  },
  addButton: {
    margin: 16,
    backgroundColor: "#2196F3",
  },
});
