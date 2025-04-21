import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

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
        { backgroundColor: GlobalStyles.colors.gray50 },
      ]}
      elevation={2}
    >
      <View style={styles.sectionHeaderContent}>
        <Avatar.Icon
          size={48}
          icon={icon}
          style={{
            backgroundColor: GlobalStyles.colors.primary50,
            marginRight: 16,
          }}
          color={GlobalStyles.colors.primary700}
        />
        <View>
          <Text style={styles.sectionHeaderText}>{title}</Text>
          <View
            style={[
              styles.sectionUnderline,
              { backgroundColor: GlobalStyles.colors.primary600 },
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
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 14,
    shadowColor: GlobalStyles.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
    color: GlobalStyles.colors.gray800,
  },
  sectionUnderline: {
    height: 3,
    width: 40,
    marginTop: 5,
    borderRadius: 1.5,
  },
});

export default SectionHeader;
