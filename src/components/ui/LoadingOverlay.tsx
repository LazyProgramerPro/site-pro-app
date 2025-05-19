import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface LoadingOverlayProps {
  message: string;
  spinnerColor?: string;
  spinnerSize?: "small" | "large" | number;
  showLogo?: boolean;
  timeout?: number;
  onTimeout?: () => void;
}

function LoadingOverlay({
  message,
  spinnerColor = "#3498db",
  spinnerSize = "large",
  showLogo = false,
  timeout,
  onTimeout,
}: LoadingOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Optional timeout
    if (timeout && onTimeout) {
      const timer = setTimeout(onTimeout, timeout);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, pulseAnim, timeout, onTimeout]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.backdrop} />
      <Animated.View
        style={[styles.contentContainer, { transform: [{ scale: pulseAnim }] }]}
      >
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}
        <Text style={styles.message}>{message}</Text>
        <ActivityIndicator size={spinnerSize} color={spinnerColor} />
      </Animated.View>
    </Animated.View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    padding: 28,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 200,
  },
  message: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3498db",
    marginBottom: 8,
  },
});
