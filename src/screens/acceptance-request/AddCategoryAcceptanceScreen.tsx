import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";

export default function AddCategoryAcceptanceScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thêm hạng mục nghiệm thu"
          onBackPress={() => navigation.goBack()}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
