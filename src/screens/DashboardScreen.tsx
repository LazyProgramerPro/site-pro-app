import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Text,
  useTheme,
  Surface,
  Avatar,
  Card,
  ActivityIndicator,
  Chip,
  Divider,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

const menuItems = [
  { label: "Dự án", icon: "folder-outline", color: "#4CAF50" },
  { label: "Nghiệm thu", icon: "check-circle-outline", color: "#2196F3" },
  { label: "Quản lý nhật ký", icon: "notebook-outline", color: "#9C27B0" },
  { label: "Quản lý vấn đề", icon: "alert-circle-outline", color: "#F44336" },
  { label: "Quản lý check-in", icon: "login", color: "#FF9800" },
  { label: "Báo cáo", icon: "chart-bar", color: "#795548" },
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

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Lộc Đỗ Trường",
    avatar:
      "https://ui-avatars.com/api/?name=Lộc+Đỗ&background=0D8ABC&color=fff&size=128",
    role: "Quản lý dự án",
  });

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate(item.label)}
    >
      <Surface style={styles.menuSurface} elevation={2}>
        <View
          style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={32}
            color={item.color}
          />
        </View>
        <Text style={styles.menuLabel}>{item.label}</Text>
      </Surface>
    </TouchableOpacity>
  );

  const renderProjectItem = ({ item }) => (
    <Card style={styles.projectCard} mode="elevated">
      <Card.Cover source={{ uri: item.image }} style={styles.projectImage} />
      <Card.Content style={styles.projectContent}>
        <Text variant="titleMedium" numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.projectDetails}>
          <View style={styles.progressContainer}>
            <Text variant="bodySmall" style={styles.progressText}>
              Tiến độ: {item.progress}%
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progress}%`,
                    backgroundColor:
                      item.progress > 80
                        ? "#4CAF50"
                        : item.progress > 40
                        ? "#FF9800"
                        : "#F44336",
                  },
                ]}
              />
            </View>
          </View>
          <Chip
            icon="calendar"
            compact
            mode="outlined"
            style={styles.dateChip}
            textStyle={styles.chipText}
          >
            {item.dueDate}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={GlobalStyles.colors.primary500}
        />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header with User Profile */}
      <LinearGradient
        colors={[
          GlobalStyles.colors.primary700,
          GlobalStyles.colors.primary500,
        ]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfoContainer}>
            <Avatar.Image source={{ uri: user.avatar }} size={60} />
            <View style={styles.userInfo}>
              <Text variant="titleMedium" style={styles.userName}>
                {user.name}
              </Text>
              <Text variant="bodySmall" style={styles.userRole}>
                {user.role}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={28}
              color="white"
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <Surface style={styles.statsContainer} elevation={2}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Dự án</Text>
        </View>
        <Divider style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Đang triển khai</Text>
        </View>
        <Divider style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Cần xử lý</Text>
        </View>
      </Surface>

      {/* Quick Access Menu */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Truy cập nhanh
        </Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.label}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Recent Projects */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Dự án gần đây
        </Text>
        <Button
          mode="text"
          compact
          onPress={() => {}}
          style={styles.viewAllButton}
          labelStyle={styles.viewAllButtonLabel}
        >
          Xem tất cả
        </Button>
      </View>

      {recentProjects.map((project) => (
        <TouchableOpacity key={project.id} onPress={() => {}}>
          {renderProjectItem({ item: project })}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");
const itemSize = width / 3 - 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingText: {
    marginTop: 16,
    color: GlobalStyles.colors.primary500,
  },
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 26,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    color: "white",
    fontWeight: "bold",
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF5252",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  statLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.gray700,
    marginTop: 4,
  },
  statDivider: {
    height: "70%",
    width: 1,
    alignSelf: "center",
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
  viewAllButton: {
    marginRight: -8,
  },
  viewAllButtonLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.primary500,
  },
  gridContainer: {
    paddingHorizontal: 8,
  },
  gridItem: {
    width: itemSize,
    aspectRatio: 1,
    margin: 8,
  },
  menuSurface: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
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
    fontWeight: "500",
  },
  projectCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  projectImage: {
    height: 120,
  },
  projectContent: {
    paddingVertical: 12,
  },
  projectDetails: {
    marginTop: 12,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  dateChip: {
    alignSelf: "flex-start",
    height: 28,
  },
  chipText: {
    fontSize: 12,
  },
});
