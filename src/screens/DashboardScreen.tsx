import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { GlobalStyles } from "../constants/styles";

// Import our new components
import HeaderProfile from "../components/dashboard/HeaderProfile";
import QuickAccessMenu from "../components/dashboard/QuickAccessMenu";
import RecentProjects from "../components/dashboard/RecentProjects";
import StatsOverview from "../components/dashboard/StatsOverview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationModal from "../components/ui/NotificationModal";

const menuItems = [
  { label: "Dự án", icon: "folder-outline", color: "#4CAF50", name: "Project" },
  {
    label: "Nghiệm thu",
    icon: "check-circle-outline",
    color: "#2196F3",
    name: "AcceptanceRequest",
  },
  {
    label: "Quản lý nhật ký",
    icon: "notebook-outline",
    color: "#9C27B0",
    name: "DiaryManagement",
  },
  {
    label: "Quản lý vấn đề",
    icon: "alert-circle-outline",
    color: "#F44336",
    name: "ProblemManagement",
  },
  {
    label: "Quản lý check-in",
    icon: "login",
    color: "#FF9800",
    name: "CheckInManagement",
  },
  { label: "Báo cáo", icon: "chart-bar", color: "#795548", name: "Report" },
];

const recentProjects = [
  {
    id: "1",
    name: "Xây dựng chung cư Star Heights",
    progress: 65,
    dueDate: "31/07/2025",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400",
  },
  {
    id: "2",
    name: "Cải tạo khu đô thị Hà Đông",
    progress: 28,
    dueDate: "15/09/2025",
    image:
      "https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=400",
  },
  {
    id: "3",
    name: "Nhà máy xử lý nước Bắc Ninh",
    progress: 92,
    dueDate: "20/05/2025",
    image:
      "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?q=80&w=400",
  },
];

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Thuong Dev",
    avatar:
      "https://ui-avatars.com/api/?name=Thường&background=0D8ABC&color=fff&size=128",
    role: "nhathauthicong",
  });

  const [stats, setStats] = useState({
    projects: 12,
    active: 5,
    pending: 8,
  });

  const roles = [
    "nhathauthicong",
    "nguoipheduyet",
    "tuvangiamsat",
    "tuvanthietke",
    "chudautu",
  ];

  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [notifications] = useState([
    {
      id: "1",
      title: "Công trình mới được thêm",
      message:
        "Công trình 'Chung cư Green City' đã được thêm vào dự án của bạn",
      time: "10 phút trước",
      isRead: false,
    },
    {
      id: "2",
      title: "Nhật ký cần phê duyệt",
      message: "Có 3 nhật ký mới cần được phê duyệt từ đội thi công",
      time: "1 giờ trước",
      isRead: false,
    },
    {
      id: "3",
      title: "Cập nhật tiến độ",
      message: "Dự án 'Khu đô thị mới' đã đạt 75% tiến độ",
      time: "2 giờ trước",
      isRead: true,
    },
  ]);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
      // Save user data to local storage or state management
      // For example, using AsyncStorage or Redux
      AsyncStorage.setItem("user", JSON.stringify(user));
    }, 1000);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleMenuItemPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleProjectPress = (projectId: string) => {
    navigation.navigate("ProjectDetails", { projectId });
  };

  const handleViewAllProjects = () => {
    navigation.navigate("Project");
  };

  const handleNotificationPress = () => {
    setNotificationModalVisible(true);
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.primary500}
          />
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderProfile
          user={user}
          onNotificationPress={handleNotificationPress}
        />

        <StatsOverview stats={stats} />

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Truy cập nhanh
          </Text>
        </View>

        <QuickAccessMenu
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
        />

        <RecentProjects
          projects={recentProjects}
          onProjectPress={handleProjectPress}
          onViewAllPress={handleViewAllProjects}
        />
      </ScrollView>

      <NotificationModal
        visible={notificationModalVisible}
        onDismiss={() => setNotificationModalVisible(false)}
        notifications={notifications}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
  },
  loadingText: {
    marginTop: 16,
    color: GlobalStyles.colors.gray700,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
});
