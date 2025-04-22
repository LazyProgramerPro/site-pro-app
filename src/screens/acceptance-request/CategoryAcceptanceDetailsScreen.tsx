import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";

export default function CategoryAcceptanceDetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Chi tiết danh mục nghiệm thu"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon
                name="tools"
                size={80}
                color={theme.colors.primary}
                style={styles.icon}
              />

              <Text variant="headlineSmall" style={styles.title}>
                Chức năng đang phát triển
              </Text>

              <Text variant="bodyLarge" style={styles.subtitle}>
                Tính năng này đang được hoàn thiện và sẽ sớm ra mắt. Vui lòng
                quay lại sau.
              </Text>

              <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.button}
                icon="arrow-left"
              >
                Quay lại
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 32,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
