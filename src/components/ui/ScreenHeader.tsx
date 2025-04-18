import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

interface ScreenHeaderProps {
  title: string;
  onAddPress?: () => void;
  onOpenMenuPress?: () => void;
}

export default function ScreenHeader({
  title,
  onAddPress,
  onOpenMenuPress,
}: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <IconButton
        icon={() => <MaterialCommunityIcons name="chevron-left" size={24} />}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      {onAddPress && (
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={GlobalStyles.colors.primary700}
            />
          )}
          onPress={onAddPress}
        />
      )}
      {onOpenMenuPress && (
        <IconButton
          icon={() => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={GlobalStyles.colors.primary700}
            />
          )}
          onPress={onOpenMenuPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  title: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
  },
});
