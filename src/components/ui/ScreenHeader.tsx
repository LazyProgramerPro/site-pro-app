import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";

interface ScreenHeaderProps {
  title: string;
  onAddPress?: () => void;
}

export default function ScreenHeader({ title, onAddPress }: ScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <IconButton
        icon={() => <MaterialCommunityIcons name="chevron-left" size={24} />}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text variant="titleLarge" style={styles.title}>
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    flex: 1,
    marginLeft: 8,
  },
});
