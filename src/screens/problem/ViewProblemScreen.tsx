import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ComingSoon from "../../components/ui/ComingSoon";

export default function ViewProblemScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Xem vấn đề"
          onBackPress={() => navigation.goBack()}
        />
        <ComingSoon />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
