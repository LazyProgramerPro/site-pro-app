import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

type FormData = {
  username: string;
  password: string;
};

interface LoginFormProps {
  loginHandler: (data: FormData) => void;
  initialValues?: FormData;
}

export default function LoginForm({
  loginHandler,
  initialValues,
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialValues || {
      username: "",
      password: "",
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
          <View style={styles.headerContainer}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text variant="headlineMedium" style={styles.title}>
              Chào mừng trở lại
            </Text>
            <Text style={styles.subtext}>
              Đăng nhập để tiếp tục với tài khoản SitePro của bạn
            </Text>
          </View>
          {/* Username */}
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Vui lòng nhập tên đăng nhập",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.username}
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon="account-outline"
                    color={GlobalStyles.colors.primary600}
                  />
                }
                outlineStyle={styles.inputOutline}
                autoCapitalize="none"
                activeOutlineColor={GlobalStyles.colors.primary600}
              />
            )}
          />
          {errors.username && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={14}
                color={GlobalStyles.colors.error500}
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>{errors.username.message}</Text>
            </View>
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
                left={
                  <TextInput.Icon
                    icon="lock-outline"
                    color={GlobalStyles.colors.primary600}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    color={GlobalStyles.colors.gray600}
                  />
                }
                outlineStyle={styles.inputOutline}
                activeOutlineColor={GlobalStyles.colors.primary600}
              />
            )}
          />
          {errors.password && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={14}
                color={GlobalStyles.colors.error500}
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>{errors.password.message}</Text>
            </View>
          )}
          {/* Đăng nhập */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            rippleColor="rgba(255, 255, 255, 0.25)"
            icon="login"
            uppercase={false}
          >
            <Text style={styles.loginText}>Đăng nhập</Text>
          </Button>
          <Button
            mode="text"
            onPress={() => {}}
            style={styles.forgotButton}
            textColor={GlobalStyles.colors.primary700}
            uppercase={false}
          >
            <Text>Quên mật khẩu?</Text>
          </Button>
          <View style={styles.footerContainer}>
            <Text style={styles.supportText}>
              Liên hệ hỗ trợ kỹ thuật: hotline@company.com
            </Text>
            <View style={styles.divider} />
            <View style={styles.copyrightContainer}>
              <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
              <Text style={styles.copyrightText}>© 2025 SitePro</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  surface: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 18,
    borderRadius: 24,
    elevation: 8,
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderWidth: 0,
  },
  logo: {
    marginBottom: 8,
    alignSelf: "center",
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginTop: 0,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    color: GlobalStyles.colors.primary800,
    fontSize: 26,
  },
  subtext: {
    marginBottom: 16,
    fontSize: 15,
    color: GlobalStyles.colors.gray600,
    textAlign: "center",
  },
  input: {
    marginBottom: 8,
    width: "100%",
    backgroundColor: GlobalStyles.colors.gray50,
    height: 56,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.gray300,
  },
  button: {
    marginTop: 16,
    borderRadius: 16,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary600,
    elevation: 4,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  buttonContent: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotButton: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    marginBottom: 0,
    marginLeft: 6,
    fontSize: 12,
    flexShrink: 1,
  },
  supportText: {
    marginTop: 12,
    fontSize: 13,
    color: GlobalStyles.colors.gray600,
    textAlign: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 0,
    position: "relative",
  },
  footerContainer: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: GlobalStyles.colors.gray200,
    marginVertical: 8,
  },
  copyrightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 4,
  },
  versionText: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500,
    fontWeight: "500",
  },
  copyrightText: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500,
    fontWeight: "500",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 8,
    marginTop: -4,
  },
  errorIcon: {
    marginRight: 6,
    marginTop: 1,
  },
});
