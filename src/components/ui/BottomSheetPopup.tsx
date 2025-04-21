import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Avatar,
  IconButton,
  Portal,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

type ActionItem = {
  icon: string;
  label: string;
  onPress: () => void;
  type: "primary" | "danger";
};

interface BottomSheetPopupProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  addAction?: Omit<ActionItem, "type">;
  cancelAction?: Omit<ActionItem, "type">;
  viewAction?: Omit<ActionItem, "type">;
  editAction?: Omit<ActionItem, "type">;
  deleteAction?: Omit<ActionItem, "type">;
  selectedAction?: Omit<ActionItem, "type">;
}

const ActionButton = ({
  action,
  type,
  onDismiss,
  theme,
}: {
  action: Omit<ActionItem, "type">;
  type: "primary" | "danger";
  onDismiss: () => void;
  theme: any;
}) => {
  const isDanger = type === "danger";
  const color = isDanger
    ? GlobalStyles.colors.red500
    : GlobalStyles.colors.white;

  return (
    <TouchableRipple
      onPress={() => {
        onDismiss();
        action.onPress();
      }}
      style={styles.bottomSheetItem}
      rippleColor={color + "20"}
    >
      <View style={styles.bottomSheetItemContent}>
        <Avatar.Icon
          size={32}
          icon={action.icon}
          color={color}
          style={{ backgroundColor: GlobalStyles.colors.primary400 }}
        />
        <Text
          variant="bodyLarge"
          style={[
            styles.bottomSheetItemText,
            { color: theme.colors.onSurface },
          ]}
        >
          {action.label}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default function BottomSheetPopup({
  visible,
  onDismiss,
  title,
  cancelAction,
  addAction,
  viewAction,
  editAction,
  deleteAction,
  selectedAction,
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
  }, [visible, height]);

  // Memoize action items to prevent unnecessary re-renders
  const actionItems = useMemo(
    () =>
      [
        { key: "selected", action: selectedAction, type: "primary" as const },
        { key: "add", action: addAction, type: "primary" as const },
        { key: "cancel", action: cancelAction, type: "danger" as const },
        { key: "view", action: viewAction, type: "primary" as const },
        { key: "edit", action: editAction, type: "primary" as const },
        { key: "delete", action: deleteAction, type: "danger" as const },
      ].filter((item) => item.action),
    [
      addAction,
      cancelAction,
      viewAction,
      editAction,
      deleteAction,
      selectedAction,
    ]
  );

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <Surface style={styles.bottomSheetSurface}>
          <View style={styles.bottomSheetContentWrapper}>
            <View style={styles.bottomSheetHeader}>
              <Text variant="titleMedium">{title}</Text>
              <IconButton icon="close" onPress={onDismiss} />
            </View>
            <View style={styles.bottomSheetContent}>
              {actionItems.map(({ key, action, type }) =>
                action ? (
                  <ActionButton
                    key={key}
                    action={action}
                    type={type}
                    onDismiss={onDismiss}
                    theme={theme}
                  />
                ) : null
              )}
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
