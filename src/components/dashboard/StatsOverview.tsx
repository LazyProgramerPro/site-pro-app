import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { STATUS_COLORS } from "../../constants/styles";

type StatsOverviewProps = {
  stats: {
    projects: number;
    active: number;
    pending: number;
  };
};

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <Surface style={styles.statsContainer} elevation={2}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{stats.projects}</Text>
        <Text style={styles.statLabel}>Dự án</Text>
      </View>
      <Divider style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.activeStatValue]}>
          {stats.active}
        </Text>
        <Text style={[styles.statLabel, styles.activeStatLabel]}>
          Đang triển khai
        </Text>
      </View>
      <Divider style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.pendingStatValue]}>
          {stats.pending}
        </Text>
        <Text style={[styles.statLabel, styles.pendingStatLabel]}>
          Cần xử lý
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  statLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.gray600,
    marginTop: 4,
  },
  statDivider: {
    height: "70%",
    width: 1,
    alignSelf: "center",
  },
  activeStatValue: {
    color: STATUS_COLORS.STATUS.COMPLETED.TEXT,
  },
  activeStatLabel: {
    color: STATUS_COLORS.STATUS.COMPLETED.TEXT,
  },
  pendingStatValue: {
    color: GlobalStyles.colors.error500,
  },
  pendingStatLabel: {
    color: GlobalStyles.colors.error500,
  },
});

export default StatsOverview;
