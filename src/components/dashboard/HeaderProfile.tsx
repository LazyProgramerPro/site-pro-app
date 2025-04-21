import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
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
  return (
    <LinearGradient
      colors={[GlobalStyles.colors.primary700, GlobalStyles.colors.primary500]}
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
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <MaterialCommunityIcons name="bell-outline" size={28} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    color: GlobalStyles.colors.gray200,
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
    backgroundColor: GlobalStyles.colors.error500,
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
});

export default HeaderProfile;
