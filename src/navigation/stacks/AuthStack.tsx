import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";
import LoginScreen from "../../screens/LoginScreen";

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get("window");

export default function AuthStack() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      {/* StatusBar with light content for better visibility on dark background */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Gradient background that extends under status bar */}
      <LinearGradient
        colors={[
          GlobalStyles.colors.primary900 || "#0D47A1",
          GlobalStyles.colors.primary600 || "#1E88E5",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Safe area container for content */}
      <SafeAreaView
        style={styles.container}
        edges={["right", "bottom", "left"]}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            contentStyle: {
              backgroundColor: "transparent",
              // Apply top inset padding to content if header is not shown
              paddingTop: insets.top,
            },
            animation: Platform.OS === "ios" ? "default" : "slide_from_right",
            presentation: "card",
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: width * 0.6,
    height: 80,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
