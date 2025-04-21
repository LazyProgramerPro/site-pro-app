import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

type FormData = {
  email: string;
  password: string;
  server: string;
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
      server: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    loginHandler(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />

          <Text variant="headlineSmall" style={styles.title}>
            Đăng nhập tài khoản SitePro
          </Text>

          <Text style={styles.subtext}>
            Vui lòng đăng nhập tài khoản SitePro của bạn
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Tên tài khoản"
                placeholder="Nhập địa chỉ email"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
                style={styles.input}
                left={<TextInput.Icon icon="email-outline" />}
                outlineStyle={styles.inputOutline}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>
              <MaterialCommunityIcons name="alert-circle-outline" size={14} />{" "}
              {errors.email.message}
            </Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Vui lòng nhập mật khẩu" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                secureTextEntry={!isPasswordVisible}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
                style={styles.input}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
                outlineStyle={styles.inputOutline}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>
              <MaterialCommunityIcons name="alert-circle-outline" size={14} />{" "}
              {errors.password.message}
            </Text>
          )}

          {/* Server */}
          <Controller
            control={control}
            name="server"
            rules={{ required: "Vui lòng nhập địa chỉ máy chủ" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Địa chỉ máy chủ"
                placeholder="192.168.0.1 hoặc tên miền: company.com"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.server}
                style={styles.input}
                left={<TextInput.Icon icon="server" />}
                outlineStyle={styles.inputOutline}
              />
            )}
          />
          {errors.server && (
            <Text style={styles.errorText}>
              <MaterialCommunityIcons name="alert-circle-outline" size={14} />{" "}
              {errors.server.message}
            </Text>
          )}

          {/* Đăng nhập */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            rippleColor="rgba(255, 255, 255, 0.2)"
            icon="login"
          >
            <Text style={styles.loginText}>Đăng nhập</Text>
          </Button>

          <Text style={styles.supportText}>
            Liên hệ hỗ trợ kỹ thuật: hotline@company.com
          </Text>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  surface: {
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.gray100, // Lighter background
  },
  logo: {
    marginBottom: 16,
    alignSelf: "center",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: GlobalStyles.colors.primary800,
  },
  subtext: {
    marginBottom: 24,
    fontSize: 14,
    color: GlobalStyles.colors.gray700,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    width: "100%",
    backgroundColor: GlobalStyles.colors.white, // White input background for contrast
  },
  inputOutline: {
    borderRadius: 8,
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary700,
    elevation: 2,
  },
  loginText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonContent: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: GlobalStyles.colors.error500, // Use consistent error color
    marginBottom: 12,
    marginLeft: 4,
    fontSize: 12,
    width: "100%",
  },
  supportText: {
    marginTop: 24,
    fontSize: 12,
    color: GlobalStyles.colors.gray700, // Slightly darker for better readability
    textAlign: "center",
  },
});
