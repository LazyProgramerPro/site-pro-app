import React, { useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { GlobalStyles } from "../constants/styles";

// Import our new components
import HeaderProfile from "../components/dashboard/HeaderProfile";
import QuickAccessMenu from "../components/dashboard/QuickAccessMenu";
import RecentProjects from "../components/dashboard/RecentProjects";
import StatsOverview from "../components/dashboard/StatsOverview";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import NotificationModal from "../components/ui/NotificationModal";
import { getProjects } from "../redux/slices/projectSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

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

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [refreshing, setRefreshing] = useState(false);

  // Lấy user từ redux store
  const user = useAppSelector((state: RootState) => state.auth.user);
  // Lấy projectList và totalCount từ redux store
  const {
    projectList,
    totalCount: totalProject,
    loading,
  } = useAppSelector((state: RootState) => state.project);

  console.log("Project List:", projectList);

  // Tính toán stats từ projectList
  const stats = useMemo(
    () => ({
      totalProject: totalProject,
      active: projectList.filter((p) => p.status === "Pending").length,
      pending: projectList.filter((p) => p.status === "Pending").length,
    }),
    [totalProject, projectList]
  );

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Fetching projects...");
    dispatch(getProjects());
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

  const handleProjectPress = (projectId: number | string) => {
    navigation.navigate("ProjectDetails", { projectId });
  };

  const handleViewAllProjects = () => {
    navigation.navigate("Project");
  };

  const handleNotificationPress = () => {
    setNotificationModalVisible(true);
  };

  // Chuẩn hóa user cho HeaderProfile (tránh null)
  const headerUser = user
    ? {
        name: user.username || "Người dùng",
        avatar:
          "https://ui-avatars.com/api/?name=Thường&background=0D8ABC&color=fff&size=128",
        role: user.is_active ? "Thành viên" : "Chưa kích hoạt",
      }
    : {
        name: "Người dùng",
        avatar:
          "https://ui-avatars.com/api/?name=Thường&background=0D8ABC&color=fff&size=128",
        role: "",
      };

  if (loading) {
    return (
      <LoadingOverlay
        message="Đang tải dữ liệu..."
        spinnerColor="#1976D2"
        showLogo={true}
      />
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
          user={headerUser}
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
          projects={
            projectList.length > 4 ? projectList.slice(0, 4) : projectList
          }
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
