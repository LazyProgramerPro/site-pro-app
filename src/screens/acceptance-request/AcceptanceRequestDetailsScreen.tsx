import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import ComingSoon from "../../components/ui/ComingSoon";

export default function AcceptanceRequestDetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Chi tiết yêu cầu nghiệm thu"
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
    backgroundColor: "#f5f5f5",
  },
});
