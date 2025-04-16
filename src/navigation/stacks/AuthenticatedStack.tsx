import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Badge,
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";
import { logout } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";
import WelcomeScreen from "../../screens/WelcomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";

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
  const dispatch = useAppDispatch();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const hideDialog = () => setLogoutVisible(false);
  const showLogoutDialog = () => setLogoutVisible(true);
  const handleLogout = () => {
    hideDialog();
    dispatch(logout());
  };

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
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: GlobalStyles.colors.primary700 || "#80cbc4",
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontWeight: "500",
            fontSize: 12,
            marginBottom: 5,
          },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="cog-outline"
              iconColor={tintColor}
              size={24}
              onPress={showLogoutDialog}
              style={styles.headerButton}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="home" color={color} size={size} />
            ),
          }}
        />

        <BottomTabs.Screen
          name="Profile"
          component={WelcomeScreen}
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="person" color={color} size={size} />
            ),
          }}
        />
      </BottomTabs.Navigator>

      <Portal>
        <Dialog
          visible={logoutVisible}
          onDismiss={hideDialog}
          style={styles.dialog}
        >
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Bạn chắc chắn muốn đăng xuất?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Hủy</Button>
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

      <Stack.Screen
        name="Settings"
        component={WelcomeScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
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
