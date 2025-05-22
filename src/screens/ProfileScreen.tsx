import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
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
import ScreenWrapper from "../components/ui/ScreenWrapper";
import { GlobalStyles } from "../constants/styles";
import { logout } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import { tokenService } from "../services/token-service";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Animation for button press
  const animateScale = (value: number) => {
    Animated.spring(scaleAnim, {
      toValue: value,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handleLogoutPress = () => {
    setLogoutDialogVisible(true);
  };

  const handleLogout = () => {
    setLogoutDialogVisible(false);
    tokenService.clearTokenRefresh(); // Clear auto refresh khi logout
    dispatch(logout());
  };

  const handleItemPress = (screenName: any) => {
    setActiveItem(screenName);
    setTimeout(() => {
      setActiveItem(null);
      navigation.navigate(screenName);
    }, 150);
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
          <View style={styles.headerContent}>
            <Surface style={styles.avatarContainer}>
              <Avatar.Image
                size={90}
                source={{
                  uri: "https://ui-avatars.com/api/?name=Chu+Dautu&background=0D8ABC&color=fff&size=256",
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
            <Text style={styles.username}>Chudautu</Text>
            <Text style={styles.userRole}>Quản lý dự án</Text>
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
          </Surface>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
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
        </View>

        <Portal>
          <Dialog
            visible={logoutDialogVisible}
            onDismiss={() => setLogoutDialogVisible(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>
              Xác nhận đăng xuất
            </Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setLogoutDialogVisible(false)}>
                Huỷ bỏ
              </Button>
              <Button
                onPress={handleLogout}
                mode="contained"
                buttonColor={GlobalStyles.colors.error500}
              >
                Đăng xuất
              </Button>
            </Dialog.Actions>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -20,
  },
  menuContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  menuItem: {
    paddingVertical: 12,
    backgroundColor: "white",
  },
  activeItem: {
    backgroundColor: "#f0f9ff",
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
  },
  itemDescription: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500,
    marginLeft: 16,
    marginTop: 4,
  },
  listIcon: {
    marginLeft: 8,
    marginRight: -8,
  },
  activeIcon: {
    backgroundColor: "rgba(0, 120, 212, 0.1)",
    borderRadius: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: `${GlobalStyles.colors.gray700}20`,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  versionText: {
    color: GlobalStyles.colors.gray500,
    fontSize: 12,
  },
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  logoutTouch: {
    borderRadius: 28,
    overflow: "hidden",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 28,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  dialog: {
    borderRadius: 16,
    backgroundColor: "white",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
