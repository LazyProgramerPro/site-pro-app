import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Portal,
  Surface,
  TouchableRipple,
  Text,
  IconButton,
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
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

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
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomSheetSurface: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
