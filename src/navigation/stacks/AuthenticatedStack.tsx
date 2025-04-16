import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { IconButton } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { logout } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";
import WelcomeScreen from "../../screens/WelcomeScreen";

export default function AuthenticatedStack() {
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              iconColor={tintColor}
              size={24}
              onPress={() => dispatch(logout())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
