import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Định nghĩa các màu sắc cụ thể cho từng trạng thái
// Bạn có thể chuyển các màu này vào file theme.ts để quản lý tập trung
const statusColors = {
  Pending: {
    backgroundColor: "#FFFBEB", // Light Yellow
    textColor: "#B45309", // Amber 700
    icon: "clock-outline",
  },
  Approved: {
    backgroundColor: "#F0FDF4", // Light Green
    textColor: "#15803D", // Green 700
    icon: "check-circle-outline",
  },
  Rejected: {
    backgroundColor: "#FEF2F2", // Light Red
    textColor: "#B91C1C", // Red 700
    icon: "close-circle-outline",
  },
  "In Progress": {
    backgroundColor: "#EFF6FF", // Light Blue
    textColor: "#1D4ED8", // Blue 700
    icon: "progress-wrench", // Hoặc "cog-outline", "autorenew"
  },
};

export type ProjectStatus = keyof typeof statusColors;

interface StatusChipProps {
  status: ProjectStatus;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const statusConfig = statusColors[status] || statusColors.Pending; // Mặc định là Pending nếu status không hợp lệ

  return (
    <Chip
      icon={({ size, color }) => (
        <MaterialCommunityIcons
          name={statusConfig.icon}
          size={size * 0.9} // Điều chỉnh kích thước icon nếu cần
          color={statusConfig.textColor}
        />
      )}
      mode="flat" // "flat" hoặc "outlined"
      compact={true} // Thêm compact prop
      style={[
        styles.chipBase,
        { backgroundColor: statusConfig.backgroundColor },
        style,
      ]}
      textStyle={[
        { color: statusConfig.textColor },
        styles.chipText,
        textStyle,
      ]}
    >
      {status}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chipBase: {
    alignSelf: "flex-start", // Ensures chip doesn't stretch in a flex container
    marginRight: 8,
    marginBottom: 4, // Added for better vertical spacing
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0, // Bỏ border nếu có từ theme mặc định của Chip
  },
  chipText: {
    fontSize: 12, // Cỡ chữ cho text trong chip
    fontWeight: "500",
    lineHeight: 16, // Đảm bảo text căn giữa theo chiều dọc
  },
});

export default StatusChip;
