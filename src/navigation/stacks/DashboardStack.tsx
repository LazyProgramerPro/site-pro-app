import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AcceptanceRequestScreen from "../../screens/AcceptanceRequestScreen";
import CheckInManagementScreen from "../../screens/CheckInManagementScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import DiaryManagementScreen from "../../screens/DiaryManagementScreen";
import ProblemManagementScreen from "../../screens/ProblemManagementScreen";
import ProjectScreen from "../../screens/ProjectScreen";
import ReportScreen from "../../screens/ReportScreen";

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
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="AcceptanceRequest"
        component={AcceptanceRequestScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DiaryManagement"
        component={DiaryManagementScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProblemManagement"
        component={ProblemManagementScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CheckInManagement"
        component={CheckInManagementScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
