import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Avatar, Badge, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";

type HeaderProfileProps = {
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  onNotificationPress?: () => void;
};

const HeaderProfile = ({ user, onNotificationPress }: HeaderProfileProps) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isSmallScreen = width < 380;
  const avatarSize = isSmallScreen ? 50 : 60;

  return (
    <LinearGradient
      colors={[GlobalStyles.colors.primary700, GlobalStyles.colors.primary500]}
      style={[
        styles.headerGradient,
        { paddingTop: Math.max(insets.top + 8, 16) },
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={[
          styles.headerContent,
          { paddingHorizontal: isSmallScreen ? 12 : 16 },
        ]}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Avatar.Image source={{ uri: user.avatar }} size={avatarSize} />
            <View style={styles.onlineIndicator} />
          </View>
          <View
            style={[styles.userInfo, { marginLeft: isSmallScreen ? 12 : 16 }]}
          >
            <Text
              variant={isSmallScreen ? "titleSmall" : "titleMedium"}
              style={styles.userName}
              numberOfLines={1}
            >
              Xin chào, {user.name}
            </Text>
            <Text variant="bodySmall" style={styles.userRole} numberOfLines={1}>
              {user.role}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
          accessibilityLabel="Thông báo"
          accessibilityHint="Nhấn để xem thông báo"
        >
          <View style={styles.notificationIconContainer}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={isSmallScreen ? 24 : 28}
              color="white"
            />
            <Badge style={styles.notificationBadge} size={18}>
              3
            </Badge>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 26,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontWeight: "700",
    ...Platform.select({
      ios: {
        fontFamily: "System",
      },
      android: {
        fontFamily: "Roboto-Bold",
      },
    }),
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
    fontWeight: "500",
  },
  notificationButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  notificationIconContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: GlobalStyles.colors.red500,
    minWidth: 18,
    height: 18,
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default HeaderProfile;
