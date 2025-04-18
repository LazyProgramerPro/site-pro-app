import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ACCEPTANCE_REQUEST_TEXTS } from "../../constants/acceptance-request";
import { ICONS_NAME } from "../../constants/icon";
import { STATUS_COLORS } from "../../constants/styles";
import {
  AcceptanceRequest,
  cancelEditingAcceptanceRequest,
  deleteAcceptanceRequest,
  startEditingAcceptanceRequest,
} from "../../redux/slices/acceptanceRequestSlice";
import BottomSheetPopup from "../ui/BottomSheetPopup";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

interface AcceptanceRequestItemProps {
  item: AcceptanceRequest;
  // selectedItem: AcceptanceRequest | null;
  // onSelect: (item: AcceptanceRequest) => void;
  // visibleItemMenu: number | null;
  // onMenuPress: (itemId: number) => void;
  // onMenuDismiss: () => void;
  // onViewPress: (item: AcceptanceRequest) => void;
  // onEditPress: (item: AcceptanceRequest) => void;
  // onDeletePress: (item: AcceptanceRequest) => void;
}

export default function AcceptanceRequestItem({
  item,
}: // selectedItem,
// onSelect,
// visibleItemMenu,
// onMenuPress,
// onMenuDismiss,
// onViewPress,
// onEditPress,
// onDeletePress,
AcceptanceRequestItemProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { editingAcceptanceRequest, selectedProject, selectedConstruction } =
    useSelector((state: RootState) => state.acceptanceRequest);

  const handleAddAcceptanceRequest = () => {
    if (selectedProject && selectedConstruction) {
      console.log("Add new Acceptance request for:", {
        selectedProject,
        selectedConstruction,
      });
    }
  };

  const handleViewPressAcceptanceRequest = (item: AcceptanceRequest) => {
    console.log("View item:", item);
  };

  const handleEditPressAcceptanceRequest = (item: AcceptanceRequest) => {
    console.log("Edit item:", item);
  };

  const handleDeletePressAcceptanceRequest = (item: AcceptanceRequest) => {
    dispatch(deleteAcceptanceRequest(item.id));
  };

  const handleOpenMenu = (acceptanceRequestId: number) => {
    dispatch(startEditingAcceptanceRequest(acceptanceRequestId));
  };

  const handleCloseMenu = () => {
    dispatch(cancelEditingAcceptanceRequest());
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case ACCEPTANCE_REQUEST_TEXTS.STATUS.COMPLETED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.COMPLETED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.COMPLETED.TEXT,
        };
      case ACCEPTANCE_REQUEST_TEXTS.STATUS.IN_PROGRESS:
        return {
          icon: ICONS_NAME.CLOCK,
          backgroundColor: STATUS_COLORS.STATUS.IN_PROGRESS.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.IN_PROGRESS.TEXT,
        };
      default:
        return {
          icon: ICONS_NAME.ALERT_CIRCLE,
          backgroundColor: STATUS_COLORS.STATUS.NOT_STARTED.BACKGROUND,
          textColor: STATUS_COLORS.STATUS.NOT_STARTED.TEXT,
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  return (
    <>
      <Card
        style={[
          styles.card,
          item.id === editingAcceptanceRequest?.id && styles.selectedCard,
        ]}
        // onPress={() => onSelect(item)}
      >
        <Card.Content>
          <View style={styles.itemHeader}>
            <View style={styles.itemHeaderLeft}>
              <Icon
                name={ICONS_NAME.NOTEBOOK}
                size={20}
                color={
                  item.id === editingAcceptanceRequest?.id
                    ? STATUS_COLORS.ICON.SELECTED
                    : STATUS_COLORS.ICON.DEFAULT
                }
              />
              <Text
                variant="titleMedium"
                style={
                  item.id === editingAcceptanceRequest?.id
                    ? styles.selectedText
                    : {}
                }
              >
                {item.id}
              </Text>
            </View>
            <IconButton
              icon={ICONS_NAME.DOTS_VERTICAL}
              onPress={() => handleOpenMenu(item.id)}
            />
          </View>

          <View style={styles.contentSection}>
            <Chip
              icon={statusStyle.icon}
              style={[
                styles.statusChip,
                { backgroundColor: statusStyle.backgroundColor },
              ]}
              textStyle={[styles.statusText, { color: statusStyle.textColor }]}
            >
              {item.status}
            </Chip>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.CALENDAR}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">datate</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT_EDIT}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {ACCEPTANCE_REQUEST_TEXTS.INFO.UPDATED_BY}{" "}
                <Text style={styles.userText}>updatedBy</Text>
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                name={ICONS_NAME.ACCOUNT}
                size={16}
                color={STATUS_COLORS.ICON.DEFAULT}
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">
                {ACCEPTANCE_REQUEST_TEXTS.INFO.CREATED_BY}{" "}
                <Text style={styles.userText}>createdBy</Text>
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <BottomSheetPopup
        visible={item.id === editingAcceptanceRequest?.id}
        onDismiss={handleCloseMenu}
        title="Tùy chọn"
        viewAction={{
          icon: ICONS_NAME.EYE,
          label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.VIEW,
          onPress: () => handleViewPressAcceptanceRequest(item),
        }}
        editAction={{
          icon: ICONS_NAME.PENCIL,
          label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.EDIT,
          onPress: () => handleEditPressAcceptanceRequest(item),
        }}
        deleteAction={{
          icon: ICONS_NAME.DELETE,
          label: ACCEPTANCE_REQUEST_TEXTS.ACTIONS.DELETE,
          onPress: () => handleDeletePressAcceptanceRequest(item),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: STATUS_COLORS.ICON.SELECTED,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  selectedText: {
    fontWeight: "700",
    color: STATUS_COLORS.ICON.SELECTED,
  },
  contentSection: {
    paddingLeft: 4,
  },
  infoRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 6,
  },
  userText: {
    fontWeight: "500",
  },
  statusChip: {
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  statusText: {
    fontSize: 12,
  },
});
