import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Card, Chip, Text, useTheme, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type StatusCardProps = {
  status?: string;
  username?: string;
  statusType?: "processing" | "approved" | "rejected" | "pending";
  timestamp?: string;
};

const StatusCard: React.FC<StatusCardProps> = ({
  status = "Đang xử lý",
  username = "thuongdev",
  statusType = "processing",
  timestamp = "Hôm nay, 10:30",
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

  const getStatusIcon = () => {
    switch (statusType) {
      case "approved":
        return "check-circle";
      case "rejected":
        return "close-circle";
      case "pending":
        return "clock-outline";
      case "processing":
      default:
        return "progress-clock";
    }
  };

  const statusColor = getStatusColor();
  const statusIcon = getStatusIcon();

  return (
    <Card
      style={[styles.statusCard, { borderLeftColor: statusColor }]}
      elevation={2}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.statusRow}>
            <Icon
              name={statusIcon}
              size={24}
              color={statusColor}
              style={styles.statusIcon}
            />
            <Chip
              mode="outlined"
              style={[
                styles.statusChip,
                {
                  borderColor: statusColor,
                  backgroundColor: `${statusColor}10`,
                },
              ]}
              textStyle={{ color: statusColor, fontWeight: "600" }}
            >
              {status}
            </Chip>
          </View>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Người thay đổi:</Text>
          <View style={styles.userContainer}>
            <Avatar.Text
              size={24}
              label={username.substring(0, 2).toUpperCase()}
              style={{ backgroundColor: statusColor }}
            />
            <Text style={styles.value}>{username}</Text>
          </View>
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
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 8,
  },
  statusChip: {
    borderRadius: 16,
    paddingHorizontal: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default StatusCard;
