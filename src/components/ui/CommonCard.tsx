import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { STATUS_COLORS } from "../../constants/styles";
import BottomSheetPopup from "./BottomSheetPopup";
import { ICONS_NAME } from "../../constants/icon";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Action {
  icon: string;
  label: string;
  onPress: () => void;
}

interface CommonCardProps {
  children: React.ReactNode;
  title?: string;
  isSelected?: boolean;
  onPress?: () => void;
  style?: any;
  menuActions?: {
    viewAction?: Action;
    editAction?: Action;
    deleteAction?: Action;
  };
  onMenuPress?: () => void;
  showMenu?: boolean;
  onDismissMenu?: () => void;
}

export default function CommonCard({
  children,
  title,
  isSelected = false,
  onPress,
  style,
  menuActions,
  onMenuPress,
  showMenu = false,
  onDismissMenu,
}: CommonCardProps) {
  return (
    <>
      <Card
        style={[styles.card, isSelected && styles.selectedCard, style]}
        onPress={onPress}
      >
        <Card.Content>
          <View style={styles.itemHeader}>
            {title && (
              <View style={styles.itemHeaderLeft}>
                <Icon
                  name={ICONS_NAME.NOTEBOOK}
                  size={20}
                  color={
                    isSelected
                      ? STATUS_COLORS.ICON.SELECTED
                      : STATUS_COLORS.ICON.DEFAULT
                  }
                />
                <Text
                  variant="titleMedium"
                  style={[styles.title, isSelected && styles.selectedText]}
                >
                  {title}
                </Text>
              </View>
            )}
            {onMenuPress && (
              <IconButton
                icon={ICONS_NAME.DOTS_VERTICAL}
                onPress={onMenuPress}
              />
            )}
          </View>
          <View style={styles.itemContent}>{children}</View>
        </Card.Content>
      </Card>

      {menuActions && (
        <BottomSheetPopup
          visible={showMenu}
          onDismiss={onDismissMenu || (() => {})}
          title="Tùy chọn"
          viewAction={menuActions.viewAction}
          editAction={menuActions.editAction}
          deleteAction={menuActions.deleteAction}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    elevation: 2,
    padding: 1,
  },
  selectedCard: {
    borderColor: STATUS_COLORS.ICON.SELECTED,
    borderWidth: 1,
    elevation: 4,
    padding: 0,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginLeft: 8,
  },
  selectedText: {
    color: STATUS_COLORS.ICON.SELECTED,
  },
  itemContent: {
    // marginTop: 8,
  },
});
