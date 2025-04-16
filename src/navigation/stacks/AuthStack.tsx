import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";
import LoginScreen from "../../screens/LoginScreen";

const Stack = createNativeStackNavigator();

function LogoTitle(props: { tintColor?: string }) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={[styles.logo, { tintColor: props.tintColor }]}
        source={require("../../../assets/icon.png")} // Add your logo image
        resizeMode="contain"
      />
    </View>
  );
}

export default function AuthStack() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: true,
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary100 || "#f5f5f5",
        },
        animation: Platform.OS === "ios" ? "default" : "slide_from_right",
        presentation: "card",
        headerBackground: () => (
          <LinearGradient
            colors={[
              GlobalStyles.colors.primary800 || "#004d40",
              GlobalStyles.colors.primary500 || "#00897b",
            ]}
            style={{ flex: 1, paddingTop: insets.top }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  logo: {
    width: 120,
    height: 30,
  },
});
