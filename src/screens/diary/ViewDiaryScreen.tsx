import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ComingSoon from "../../components/ui/ComingSoon";
import { DiaryEntry } from "../../redux/slices/diarySlice";

export default function ViewDiaryScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Xem nhật ký"
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
