import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "../constants/styles";
import LoginScreen from "../screens/login/components/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
