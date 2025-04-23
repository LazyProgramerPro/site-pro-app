import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const ComingSoon = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
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
            Tính năng này đang được hoàn thiện và sẽ sớm ra mắt. Vui lòng quay
            lại sau.
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
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    width: "100%",
  },
});

export default ComingSoon;
