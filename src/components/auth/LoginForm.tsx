import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

type FormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  loginHandler: (data: FormData) => void;
}

export default function LoginForm({ loginHandler }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <View style={styles.loginContent}>
      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Please enter a valid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{ marginBottom: errors.email ? 8 : 28 }}
            error={!!errors.email}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            returnKeyType="done"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{ marginBottom: errors.password ? 8 : 0 }}
            error={!!errors.password}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <View style={styles.buttons}>
        <Button onPress={handleSubmit(loginHandler)}>
          <Text style={{ color: GlobalStyles.colors.primary100 }}>Login</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    // elevation: 2,
    // shadowColor: "black",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.35,
    // shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    marginLeft: 5,
  },
});
