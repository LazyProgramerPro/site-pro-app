import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";

type StatusCardProps = {
  status?: string;
  username?: string;
  statusType?: "processing" | "approved" | "rejected" | "pending";
};

const StatusCard: React.FC<StatusCardProps> = ({
  status = "Đang xử lý",
  username = "thuongdev",
  statusType = "processing",
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (statusType) {
      case "approved":
        return "#4caf50"; // Green
      case "rejected":
        return "#f44336"; // Red
      case "pending":
        return "#ff9800"; // Orange
      case "processing":
      default:
        return theme.colors.primary; // Blue/Primary
    }
  };

  const statusColor = getStatusColor();

  return (
    <Card
      style={[styles.statusCard, { borderTopColor: statusColor }]}
      elevation={1}
    >
      <View
        style={[styles.statusIndicator, { backgroundColor: statusColor }]}
      />
      <Card.Content style={styles.cardContent}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Trạng thái:</Text>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: statusColor }]}
            textStyle={{ color: statusColor }}
          >
            {status}
          </Chip>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Người thay đổi:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  statusCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderTopWidth: 4,
    overflow: "hidden", // Ensures the indicator doesn't overflow
  },
  statusIndicator: {
    height: 4,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContent: {
    paddingTop: 16, // Add more padding at the top to create space from the border
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4, // Keep existing spacing
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
  },
  statusChip: {
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});

export default StatusCard;
