import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";

type SectionHeaderProps = {
  title: string;
  section: string;
  icon: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  section,
  icon,
}) => {
  const theme = useTheme();

  return (
    <Surface
      style={[
        styles.sectionHeader,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
      elevation={2}
    >
      <View style={styles.sectionHeaderContent}>
        <Avatar.Icon
          size={42}
          icon={icon}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            marginRight: 14,
          }}
          color={theme.colors.primary}
        />
        <View>
          <Text style={styles.sectionHeaderText}>{title}</Text>
          <View
            style={[
              styles.sectionUnderline,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
    color: "#333333",
  },
  sectionUnderline: {
    height: 2,
    width: 30,
    marginTop: 4,
  },
});

export default SectionHeader;
