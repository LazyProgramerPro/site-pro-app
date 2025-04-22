import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

interface Capability {
  code: string;
  quantity: string;
  type: string;
  workforceQuantity: string;
}

interface CapabilityTableProps {
  capabilities: Capability[];
  onDelete: (index: number) => void;
}

export default function CapabilityTable({
  capabilities,
  onDelete,
}: CapabilityTableProps) {
  if (capabilities.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={[styles.headerCell, styles.codeCell]}>
          <Text style={styles.headerText}>Nhân lực</Text>
        </View>
        <View style={[styles.headerCell, styles.quantityCell]}>
          <Text style={[styles.headerText, styles.centerText]}>Số lượng</Text>
        </View>
        <View style={[styles.headerCell, styles.typeCell]}>
          <Text style={styles.headerText}>Máy móc</Text>
        </View>
        <View style={[styles.headerCell, styles.workforceCell]}>
          <Text style={[styles.headerText, styles.centerText]}>Số lượng</Text>
        </View>
        <View style={[styles.headerCell, styles.actionCell]}>
          <Text style={styles.headerText}>Xoá</Text>
        </View>
      </View>

      {capabilities.map((capability, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.cell, styles.codeCell]}>
            <Text style={styles.cellText}>{capability.code}</Text>
          </View>
          <View style={[styles.cell, styles.quantityCell]}>
            <Text style={[styles.cellText, styles.centerText]}>
              {capability.quantity}
            </Text>
          </View>
          <View style={[styles.cell, styles.typeCell]}>
            <Text style={styles.cellText}>{capability.type}</Text>
          </View>
          <View style={[styles.cell, styles.workforceCell]}>
            <Text style={[styles.cellText, styles.centerText]}>
              {capability.workforceQuantity}
            </Text>
          </View>
          <View style={[styles.cell, styles.actionCell]}>
            <IconButton
              icon="delete"
              iconColor="red"
              size={18}
              style={styles.iconButton}
              onPress={() => onDelete(index)}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 46,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    height: 46,
  },
  headerCell: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "500",
    color: "#666666",
    fontSize: 14,
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 14,
    color: "#333333",
  },
  centerText: {
    textAlign: "center",
  },
  codeCell: {
    flex: 2,
  },
  quantityCell: {
    flex: 2,
  },
  typeCell: {
    flex: 2,
  },
  workforceCell: {
    flex: 2,
  },
  actionCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
});
