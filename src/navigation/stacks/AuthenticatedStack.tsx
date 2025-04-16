import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { logout } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";
import WelcomeScreen from "../../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Home() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.primary100,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            iconColor={tintColor}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="WelcomeScreen1"
        component={WelcomeScreen}
        options={{
          title: "Welcome",
          tabBarLabel: "Welcome",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          title: "WelcomeScreen",
          tabBarLabel: "WelcomeScreen",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function AuthenticatedStack() {
  // const dispatch = useAppDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        // options={{
        //   headerRight: ({ tintColor }) => (
        //     <IconButton
        //       icon="exit"
        //       iconColor={tintColor}
        //       size={24}
        //       onPress={() => dispatch(logout())}
        //     />
        //   ),
        // }}
      />

      <Stack.Screen
        name="Settings"
        component={WelcomeScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
