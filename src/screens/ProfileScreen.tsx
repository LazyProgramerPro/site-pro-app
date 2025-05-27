import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { useSelector } from "react-redux";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { GlobalStyles } from "../constants/styles";
import { logout } from "../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { tokenService } from "../services/token-service";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Lấy thông tin user từ Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const modalScaleAnim = useState(new Animated.Value(0))[0];
  const modalOpacityAnim = useState(new Animated.Value(0))[0];

  // Animation for button press
  const animateScale = (value: number) => {
    Animated.spring(scaleAnim, {
      toValue: value,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  // Animation for modal
  const animateModal = (show: boolean) => {
    if (show) {
      Animated.parallel([
        Animated.spring(modalScaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(modalScaleAnim, {
          toValue: 0.8,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleLogoutPress = () => {
    setLogoutDialogVisible(true);
    animateModal(true);
  };

  const handleDismissLogout = () => {
    animateModal(false);
    setTimeout(() => setLogoutDialogVisible(false), 150);
  };
  const handleLogout = () => {
    animateModal(false);
    setTimeout(() => {
      setLogoutDialogVisible(false);
      tokenService.clearAutoRefresh(); // Clear auto refresh khi logout
      dispatch(logout());
    }, 150);
  };

  const handleItemPress = (screenName: any) => {
    setActiveItem(screenName);
    setTimeout(() => {
      setActiveItem(null);
      navigation.navigate(screenName);
    }, 150);
  };

  // Tạo avatar URL từ username
  const getAvatarUrl = (username: string) => {
    const name = username || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6200ee&color=fff&size=256&font-size=0.4&rounded=true`;
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header with gradient background */}
        <LinearGradient
          colors={[
            GlobalStyles.colors.primary700,
            GlobalStyles.colors.primary500,
          ]}
          style={styles.headerGradient}
        >
          {" "}
          <View style={styles.headerContent}>
            <Surface style={styles.avatarContainer}>
              <Avatar.Image
                size={90}
                source={{
                  uri: user
                    ? getAvatarUrl(user.username)
                    : getAvatarUrl("User"),
                }}
                style={styles.avatar}
              />
              <IconButton
                icon="pencil"
                size={16}
                style={styles.editButton}
                containerColor={GlobalStyles.colors.primary100}
                iconColor={GlobalStyles.colors.primary800}
                onPress={() => handleItemPress("EditProfile")}
              />
            </Surface>
            <Text style={styles.username}>
              {user?.username || "Người dùng"}
            </Text>
            <Text style={styles.userRole}>
              {user?.is_active
                ? "Tài khoản hoạt động"
                : "Tài khoản chưa kích hoạt"}
            </Text>{" "}
            <View style={styles.badgeContainer}>
              <Surface
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: user?.is_active
                      ? "rgba(76, 175, 80, 0.2)"
                      : "rgba(255, 152, 0, 0.2)",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={user?.is_active ? "check-circle" : "clock-outline"}
                  size={16}
                  color={user?.is_active ? "#66BB6A" : "#FFB74D"}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: user?.is_active ? "#66BB6A" : "#FFB74D",
                    },
                  ]}
                >
                  {user?.is_active ? "Đã xác thực" : "Chờ xác thực"}
                </Text>
              </Surface>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.content}>
          <Surface style={styles.menuContainer} elevation={2}>
            <List.Item
              title="Hồ sơ cá nhân"
              description="Thông tin tài khoản của bạn"
              descriptionStyle={styles.itemDescription}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="account-outline"
                  color={GlobalStyles.colors.primary500}
                  style={[
                    styles.listIcon,
                    activeItem === "UserProfile" && styles.activeIcon,
                  ]}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleItemPress("UserProfile")}
              style={[
                styles.menuItem,
                activeItem === "UserProfile" && styles.activeItem,
              ]}
              titleStyle={styles.menuItemTitle}
            />

            <Divider style={styles.divider} />

            <List.Item
              title="Cài đặt ứng dụng"
              description="Cài đặt giao diện và thông báo"
              descriptionStyle={styles.itemDescription}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="cog-outline"
                  color={GlobalStyles.colors.primary500}
                  style={[
                    styles.listIcon,
                    activeItem === "Settings" && styles.activeIcon,
                  ]}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleItemPress("Settings")}
              style={[
                styles.menuItem,
                activeItem === "Settings" && styles.activeItem,
              ]}
              titleStyle={styles.menuItemTitle}
            />

            <Divider style={styles.divider} />

            <List.Item
              title="Trợ giúp & Hỗ trợ"
              description="CSKH: 1900 xxxx"
              descriptionStyle={styles.itemDescription}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="help-circle-outline"
                  color={GlobalStyles.colors.primary500}
                  style={[
                    styles.listIcon,
                    activeItem === "Help" && styles.activeIcon,
                  ]}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleItemPress("Help")}
              style={[
                styles.menuItem,
                activeItem === "Help" && styles.activeItem,
              ]}
              titleStyle={styles.menuItemTitle}
            />
          </Surface>{" "}
          <View style={styles.versionContainer}>
            <Surface style={styles.versionBadge}>
              <MaterialCommunityIcons
                name="information-outline"
                size={16}
                color={GlobalStyles.colors.gray500}
              />
              <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
            </Surface>
          </View>
          <Animated.View
            style={[
              styles.logoutButtonContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <TouchableOpacity
              onPressIn={() => animateScale(0.96)}
              onPressOut={() => animateScale(1)}
              onPress={handleLogoutPress}
              style={styles.logoutTouch}
            >
              <LinearGradient
                colors={[
                  GlobalStyles.colors.primary500,
                  GlobalStyles.colors.primary700,
                ]}
                style={styles.logoutButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color="white"
                  style={styles.logoutIcon}
                />
                <Text style={styles.logoutText}>Đăng Xuất</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>{" "}
        <Portal>
          <Dialog
            visible={logoutDialogVisible}
            onDismiss={handleDismissLogout}
            style={styles.dialog}
          >
            <Animated.View
              style={[
                styles.dialogContent,
                {
                  transform: [{ scale: modalScaleAnim }],
                  opacity: modalOpacityAnim,
                },
              ]}
            >
              <View style={styles.dialogIconContainer}>
                <LinearGradient
                  colors={[GlobalStyles.colors.error500, "#FF6B6B"]}
                  style={styles.dialogIconGradient}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={32}
                    color="white"
                  />
                </LinearGradient>
              </View>

              <Dialog.Title style={styles.dialogTitle}>
                <Text style={styles.dialogTitle}>Xác nhận đăng xuất</Text>
              </Dialog.Title>

              <Dialog.Content style={styles.dialogContentText}>
                <Text variant="bodyMedium" style={styles.dialogMessage}>
                  Bạn có chắc chắn muốn đăng xuất khỏi tài khoản{" "}
                  <Text style={styles.dialogUsername}>{user?.username}</Text>?
                </Text>
              </Dialog.Content>

              <Dialog.Actions style={styles.dialogActions}>
                <Button
                  onPress={handleDismissLogout}
                  style={styles.cancelButton}
                  labelStyle={styles.cancelButtonText}
                >
                  <Text>Hủy bỏ</Text>
                </Button>{" "}
                <Button
                  onPress={handleLogout}
                  mode="contained"
                  style={styles.logoutButtonModal}
                  labelStyle={styles.logoutButtonModalText}
                  contentStyle={styles.logoutButtonModalContent}
                  icon="logout"
                >
                  <Text style={styles.logoutButtonModalText}>Đăng xuất</Text>
                </Button>
              </Dialog.Actions>
            </Animated.View>
          </Dialog>
        </Portal>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    paddingVertical: 15,
  },
  avatarContainer: {
    borderRadius: 50,
    padding: 3,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatar: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 12,
  },
  userRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  badgeContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -25,
  },
  menuContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 0,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginHorizontal: 8,
    borderRadius: 12,
    marginVertical: 2,
  },
  activeItem: {
    backgroundColor: "#f0f9ff",
    elevation: 2,
    shadowColor: GlobalStyles.colors.primary500,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: GlobalStyles.colors.gray800,
  },
  itemDescription: {
    fontSize: 13,
    color: GlobalStyles.colors.gray500,
    marginLeft: 12,
    marginTop: 2,
  },
  listIcon: {
    marginLeft: 4,
    marginRight: -8,
  },
  activeIcon: {
    backgroundColor: "rgba(98, 0, 238, 0.1)",
    borderRadius: 24,
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: `${GlobalStyles.colors.gray300}40`,
    alignSelf: "center",
    marginVertical: 4,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  versionBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  versionText: {
    color: GlobalStyles.colors.gray500,
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 8,
  },
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoutTouch: {
    borderRadius: 16,
    overflow: "hidden",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
  },
  dialog: {
    borderRadius: 24,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 0,
    overflow: "hidden",
  },
  dialogIconContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  dialogIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: GlobalStyles.colors.gray800,
    marginBottom: 8,
  },
  dialogContentText: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dialogMessage: {
    textAlign: "center",
    color: GlobalStyles.colors.gray600,
    lineHeight: 22,
    fontSize: 16,
  },
  dialogUsername: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  dialogSubMessage: {
    textAlign: "center",
    color: GlobalStyles.colors.gray500,
    marginTop: 8,
    fontSize: 14,
  },
  dialogActions: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 0,
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray300,
  },
  cancelButtonText: {
    color: GlobalStyles.colors.gray600,
    fontWeight: "600",
  },
  logoutButtonModal: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.error500,
  },
  logoutButtonModalContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  logoutButtonModalText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
