import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DashboardScreen from "../../screens/DashboardScreen";
import ProjectScreen from "../../screens/ProjectScreen";
import { IconButton } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import AcceptanceRequestScreen from "../../screens/AcceptanceRequestScreen";

const Stack = createNativeStackNavigator();

export const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header by default for all screens
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="Project"
        component={ProjectScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Dự án",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: (props) => (
            <IconButton
              {...props}
              icon="arrow-left"
              size={24}
              iconColor={GlobalStyles.colors.gray700}
              onPress={() => navigation.goBack()}
              style={{ margin: 0, marginLeft: -8 }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AcceptanceRequest"
        component={AcceptanceRequestScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Yêu cầu nghiệm thu",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerLeft: (props) => (
            <IconButton
              {...props}
              icon="arrow-left"
              size={24}
              iconColor={GlobalStyles.colors.gray700}
              onPress={() => navigation.goBack()}
              style={{ margin: 0, marginLeft: -8 }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
