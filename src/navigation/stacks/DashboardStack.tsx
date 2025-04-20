import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import AcceptanceRequestScreen from "../../screens/acceptance-request/AcceptanceRequestScreen";
import AddAcceptanceRequestScreen from "../../screens/acceptance-request/AddAcceptanceRequestScreen";
import AddCategoryAcceptanceScreen from "../../screens/acceptance-request/AddCategoryAcceptanceScreen";
import CategoryAcceptanceScreen from "../../screens/acceptance-request/CategoryAcceptanceScreen";
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
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AcceptanceRequest"
        component={AcceptanceRequestScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddAcceptanceRequest"
        component={AddAcceptanceRequestScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CategoryAcceptance"
        component={CategoryAcceptanceScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddCategoryAcceptance"
        component={AddCategoryAcceptanceScreen}
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

export type DashboardStackParamList = {
  Dashboard: undefined;
  Project: undefined;
  AcceptanceRequest: undefined;
  AddAcceptanceRequest: AddAcceptanceRequestRouteParams;
  DiaryManagement: undefined;
  ProblemManagement: undefined;
  CheckInManagement: undefined;
  Report: undefined;
  CategoryAcceptance: CategoryAcceptanceRouteParams;
};

// Define the type for route parameters
export type AddAcceptanceRequestRouteParams = {
  location: { latitude: number; longitude: number };
  projectId: number | null;
  constructionId: number | null;
  editingAcceptanceRequest?: any; // Adjust this type based on your editing acceptance request structure
};

export type CategoryAcceptanceRouteParams = {
  categoryId?: string;
  constructionId?: string;
  projectId?: string;
};

export type AddAcceptanceRequestScreenProps = NativeStackScreenProps<
  DashboardStackParamList,
  "AddAcceptanceRequest"
>;
