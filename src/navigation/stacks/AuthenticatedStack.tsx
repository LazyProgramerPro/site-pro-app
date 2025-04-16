import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";
import ProfileScreen from "../../screens/ProfileScreen";
import { DashboardStack } from "./DashboardStack";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TabBarIcon({
  name,
  color,
  size,
  badgeCount = 0,
}: {
  name: any;
  color: string;
  size: number;
  badgeCount?: number;
}) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <Badge size={16} style={styles.badge}>
          {badgeCount > 99 ? "99+" : badgeCount}
        </Badge>
      )}
    </View>
  );
}

function Home() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarActiveTintColor: GlobalStyles.colors.iconActive,
          tabBarInactiveTintColor: GlobalStyles.colors.iconInactive,
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontWeight: "500",
            fontSize: 12,
            marginBottom: 5,
          },
        })}
      >
        <BottomTabs.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            title: "Trang chủ",
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <BottomTabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Thông tin cá nhân",
            tabBarLabel: "Thông tin cá nhân",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="person" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </BottomTabs.Navigator>
    </>
  );
}

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary100 || "#f5f5f5",
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: GlobalStyles.colors.error500,
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 16,
  },
});
