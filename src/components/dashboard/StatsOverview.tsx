import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { Divider, Surface, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ICONS_NAME } from "../../constants/icon";
import { GlobalStyles, STATUS_COLORS } from "../../constants/styles";

const { width } = Dimensions.get("window");

type StatsOverviewProps = {
  stats: {
    totalProject: number;
    active: number;
    pending: number;
  };
};

type StatItemProps = {
  value: number;
  label: string;
  color: string;
  backgroundColor: string;
  icon: string;
  animationDelay?: number;
};

const StatItem = ({
  value,
  label,
  color,
  backgroundColor,
  icon,
  animationDelay = 0,
}: StatItemProps) => {
  const animatedValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(0.8);
  const opacityValue = new Animated.Value(0);
  const iconRotateValue = new Animated.Value(0);
  const bounceValue = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(animationDelay),
      Animated.parallel([
        // Scale animation
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        // Opacity animation
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        // Counter animation
        Animated.timing(animatedValue, {
          toValue: value,
          duration: 1200,
          useNativeDriver: false,
        }),
        // Icon rotation
        Animated.timing(iconRotateValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [value, animationDelay]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconRotation = iconRotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.statItem,
        {
          transform: [{ scale: scaleValue }, { scale: bounceValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <Animated.View
        style={[styles.statValueContainer, { backgroundColor }]}
        onTouchStart={handlePress}
      >
        <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
          <Icon
            name={icon}
            size={width > 400 ? 28 : 24}
            color={color}
            style={styles.statIcon}
          />
        </Animated.View>
        <Animated.Text
          style={[styles.statValue, { color, fontSize: width > 400 ? 22 : 20 }]}
        >
          {animatedValue.interpolate({
            inputRange: [0, value],
            outputRange: ["0", value.toString()],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        </Animated.Text>
      </Animated.View>
      <Text
        style={[styles.statLabel, { color, fontSize: width > 400 ? 12 : 11 }]}
      >
        {label}
      </Text>
    </Animated.View>
  );
};

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const theme = useTheme();

  return (
    <Surface style={styles.statsContainer} elevation={4}>
      <LinearGradient
        colors={["rgba(33, 150, 243, 0.05)", "rgba(255, 255, 255, 0.95)"]}
        style={styles.gradientBackground}
      >
        <StatItem
          value={stats.totalProject}
          label="Tổng dự án"
          color={GlobalStyles.colors.primary700}
          backgroundColor={GlobalStyles.colors.primary50}
          icon={ICONS_NAME.PROJECT}
          animationDelay={0}
        />

        <Divider style={styles.statDivider} />

        <StatItem
          value={stats.active}
          label="Đang triển khai"
          color={STATUS_COLORS.STATUS.COMPLETED.TEXT}
          backgroundColor={STATUS_COLORS.STATUS.COMPLETED.BACKGROUND}
          icon={ICONS_NAME.PROGRESS_WRENCH}
          animationDelay={200}
        />

        <Divider style={styles.statDivider} />

        <StatItem
          value={stats.pending}
          label="Cần xử lý"
          color={GlobalStyles.colors.error500}
          backgroundColor={GlobalStyles.colors.red50}
          icon={ICONS_NAME.ALERT_CIRCLE_OUTLINE}
          animationDelay={400}
        />
      </LinearGradient>
    </Surface>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginHorizontal: GlobalStyles.spacing.md,
    marginTop: -24,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: GlobalStyles.colors.primary600,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientBackground: {
    flexDirection: "row",
    paddingVertical: GlobalStyles.spacing.lg,
    paddingHorizontal: GlobalStyles.spacing.sm,
    borderRadius: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statValueContainer: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: GlobalStyles.spacing.xs,
    shadowColor: GlobalStyles.colors.gray600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    marginTop: GlobalStyles.spacing.xxs,
    lineHeight: 14,
  },
  statDivider: {
    height: "60%",
    width: 1,
    alignSelf: "center",
    backgroundColor: GlobalStyles.colors.gray300,
    opacity: 0.6,
  },
});

export default StatsOverview;
