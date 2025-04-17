import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
  Dimensions,
} from "react-native";
import {
  IconButton,
  Portal,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface BottomSheetPopupProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  viewAction: {
    icon: string;
    label: string;
    onPress: () => void;
  };
  editAction: {
    icon: string;
    label: string;
    onPress: () => void;
  };
  deleteAction: {
    icon: string;
    label: string;
    onPress: () => void;
  };
}

export default function BottomSheetPopup({
  visible,
  onDismiss,
  title,
  viewAction,
  editAction,
  deleteAction,
}: BottomSheetPopupProps) {
  const theme = useTheme();
  const { height } = Dimensions.get("window");
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Surface style={styles.bottomSheetSurface}>
          <View style={styles.bottomSheetContentWrapper}>
            <View style={styles.bottomSheetHeader}>
              <Text variant="titleMedium">{title}</Text>
              <IconButton icon="close" onPress={onDismiss} />
            </View>
            <View style={styles.bottomSheetContent}>
              <TouchableRipple
                onPress={() => {
                  onDismiss();
                  viewAction.onPress();
                }}
                style={styles.bottomSheetItem}
                rippleColor={theme.colors.primary + "20"}
              >
                <View style={styles.bottomSheetItemContent}>
                  <Icon
                    name={viewAction.icon}
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyLarge" style={styles.bottomSheetItemText}>
                    {viewAction.label}
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  onDismiss();
                  editAction.onPress();
                }}
                style={styles.bottomSheetItem}
                rippleColor={theme.colors.primary + "20"}
              >
                <View style={styles.bottomSheetItemContent}>
                  <Icon
                    name={editAction.icon}
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyLarge" style={styles.bottomSheetItemText}>
                    {editAction.label}
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  onDismiss();
                  deleteAction.onPress();
                }}
                style={styles.bottomSheetItem}
                rippleColor={theme.colors.error + "20"}
              >
                <View style={styles.bottomSheetItemContent}>
                  <Icon
                    name={deleteAction.icon}
                    size={24}
                    color={theme.colors.error}
                  />
                  <Text
                    variant="bodyLarge"
                    style={[
                      styles.bottomSheetItemText,
                      { color: theme.colors.error },
                    ]}
                  >
                    {deleteAction.label}
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        </Surface>
      </Animated.View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: Platform.OS === "android" ? 1 : 0,
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: Platform.OS === "android" ? 2 : 1,
  },
  bottomSheetContentWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomSheetSurface: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  bottomSheetContent: {
    padding: 16,
  },
  bottomSheetItem: {
    marginBottom: 8,
    borderRadius: 8,
  },
  bottomSheetItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  bottomSheetItemText: {
    marginLeft: 16,
  },
});
