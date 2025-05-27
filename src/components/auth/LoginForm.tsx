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
  useWindowDimensions,
} from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";

type FormData = {
  username: string;
  password: string;
};

interface LoginFormProps {
  loginHandler: (data: FormData) => Promise<void> | void;
  initialValues?: FormData;
  isLoading?: boolean;
}

export default function LoginForm({
  loginHandler,
  initialValues,
  isLoading: externalLoading = false,
}: LoginFormProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: initialValues || {
      username: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isLoading = isSubmitting || externalLoading;

  const onSubmit = async (data: FormData) => {
    await loginHandler(data);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardAvoid, { paddingTop: insets.top }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.scrollContainerLandscape,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Surface
          style={[
            styles.surface,
            isLandscape && styles.surfaceLandscape,
            { shadowColor: theme.colors.shadow },
          ]}
        >
          {/* Header với animation-ready layout */}
          <View
            style={[
              styles.headerContainer,
              isLandscape && styles.headerContainerLandscape,
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={[styles.logo, isLandscape && styles.logoLandscape]}
              />
              {/* <View style={styles.logoBadge}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={16}
                  color={GlobalStyles.colors.primary600}
                />
              </View> */}
            </View>
            <Text variant="headlineMedium" style={styles.title}>
              Chào mừng trở lại
            </Text>
            <Text style={styles.subtext}>
              Đăng nhập để tiếp tục với tài khoản SitePro của bạn
            </Text>
          </View>

          {/* Form Fields với improved spacing */}
          <View
            style={[
              styles.formContainer,
              isLandscape && styles.formContainerLandscape,
            ]}
          >
            {/* Username Field */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "Vui lòng nhập tên đăng nhập",
                  minLength: {
                    value: 3,
                    message: "Tên đăng nhập phải có ít nhất 3 ký tự",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập của bạn"
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.username}
                    style={styles.input}
                    left={
                      <TextInput.Icon
                        icon="account-outline"
                        color={
                          errors.username
                            ? theme.colors.error
                            : GlobalStyles.colors.primary600
                        }
                      />
                    }
                    outlineStyle={[
                      styles.inputOutline,
                      errors.username && styles.inputOutlineError,
                    ]}
                    autoCapitalize="none"
                    autoComplete="username"
                    activeOutlineColor={GlobalStyles.colors.primary600}
                    contentStyle={styles.inputContent}
                  />
                )}
              />{" "}
              {errors.username && (
                <View style={styles.errorContainer}>
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={16}
                    color={GlobalStyles.colors.red600}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorText}>
                    {errors.username.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Vui lòng nhập mật khẩu",
                  // minLength: {
                  //   value: 6,
                  //   message: "Mật khẩu phải có ít nhất 6 ký tự",
                  // },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu của bạn"
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
                        color={
                          errors.password
                            ? theme.colors.error
                            : GlobalStyles.colors.primary600
                        }
                      />
                    }
                    right={
                      <TextInput.Icon
                        icon={isPasswordVisible ? "eye-off" : "eye"}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        color={GlobalStyles.colors.gray500}
                      />
                    }
                    outlineStyle={[
                      styles.inputOutline,
                      errors.password && styles.inputOutlineError,
                    ]}
                    activeOutlineColor={GlobalStyles.colors.primary600}
                    autoComplete="current-password"
                    contentStyle={styles.inputContent}
                  />
                )}
              />{" "}
              {errors.password && (
                <View style={styles.errorContainer}>
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={16}
                    color={GlobalStyles.colors.red600}
                    style={styles.errorIcon}
                  />
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                contentStyle={styles.buttonContent}
                rippleColor="rgba(255, 255, 255, 0.25)"
                icon={isLoading ? undefined : "login"}
                uppercase={false}
                loading={isLoading}
                disabled={isLoading}
              >
                <Text style={styles.loginText}>
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Text>
              </Button>

              <Button
                mode="text"
                onPress={() => {}}
                style={styles.forgotButton}
                textColor={GlobalStyles.colors.primary600}
                uppercase={false}
                icon="help-circle-outline"
                labelStyle={{ fontSize: 14, fontWeight: "600" }}
              >
                Quên mật khẩu?
              </Button>
            </View>
          </View>

          {/* Footer với improved layout */}
          <View style={styles.footerContainer}>
            <View style={styles.supportContainer}>
              {" "}
              <MaterialCommunityIcons
                name="headset"
                size={16}
                color={GlobalStyles.colors.primary600}
              />
              <Text style={styles.supportText}>
                Hỗ trợ: hotline@company.com
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.copyrightContainer}>
              <View style={styles.versionContainer}>
                {" "}
                <MaterialCommunityIcons
                  name="information-outline"
                  size={12}
                  color={GlobalStyles.colors.gray600}
                />
                <Text style={styles.versionText}>v1.0.0</Text>
              </View>
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
    padding: GlobalStyles.spacing.md,
  },
  scrollContainerLandscape: {
    padding: GlobalStyles.spacing.sm,
  },
  surface: {
    padding: GlobalStyles.spacing.lg,
    paddingTop: GlobalStyles.spacing.xl,
    paddingBottom: GlobalStyles.spacing.xl,
    borderRadius: 28,
    elevation: 12,
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray100,
    maxWidth: 420, // Responsive constraint
    width: "100%",
    alignSelf: "center",
  },
  surfaceLandscape: {
    maxWidth: 600,
    paddingVertical: GlobalStyles.spacing.md,
  },
  // Header Styles
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: GlobalStyles.spacing.xl,
    paddingBottom: 0,
  },
  headerContainerLandscape: {
    marginBottom: GlobalStyles.spacing.md,
  },
  logoContainer: {
    position: "relative",
    marginBottom: GlobalStyles.spacing.sm,
  },
  logo: {
    alignSelf: "center",
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logoLandscape: {
    width: 60,
    height: 60,
  },
  logoBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontWeight: "700",
    marginBottom: GlobalStyles.spacing.xxs,
    textAlign: "center",
    color: GlobalStyles.colors.gray900,
    fontSize: 28,
    letterSpacing: -0.5,
  },
  subtext: {
    marginBottom: GlobalStyles.spacing.xs,
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },

  // Form Styles
  formContainer: {
    width: "100%",
    gap: GlobalStyles.spacing.sm,
  },
  formContainerLandscape: {
    gap: GlobalStyles.spacing.xs,
  },
  inputContainer: {
    width: "100%",
    marginBottom: GlobalStyles.spacing.xs,
  },
  input: {
    width: "100%",
    backgroundColor: GlobalStyles.colors.white,
    fontSize: 16,
    borderRadius: 16,
  },
  inputContent: {
    paddingVertical: GlobalStyles.spacing.sm,
  },
  inputOutline: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.gray200,
  },
  inputOutlineError: {
    borderColor: GlobalStyles.colors.red600,
    borderWidth: 2,
  },
  // Action Styles
  actionContainer: {
    width: "100%",
    marginTop: GlobalStyles.spacing.xl,
    gap: GlobalStyles.spacing.md,
  },
  button: {
    borderRadius: 16,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary600,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    marginTop: GlobalStyles.spacing.xs,
  },
  buttonContent: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: GlobalStyles.spacing.xs,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalStyles.colors.white,
    letterSpacing: 0.2,
  },
  forgotButton: {
    alignSelf: "center",
    paddingVertical: GlobalStyles.spacing.xs,
    paddingHorizontal: GlobalStyles.spacing.sm,
    borderRadius: 12,
    marginTop: GlobalStyles.spacing.xs,
  },

  // Error Styles
  errorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginTop: GlobalStyles.spacing.xxs,
    paddingHorizontal: GlobalStyles.spacing.xxs,
  },
  errorIcon: {
    marginRight: GlobalStyles.spacing.xs,
    marginTop: 1,
  },
  errorText: {
    color: GlobalStyles.colors.red600,
    fontSize: 13,
    flexShrink: 1,
    lineHeight: 18,
    fontWeight: "500",
  },
  // Footer Styles
  footerContainer: {
    width: "100%",
    marginTop: GlobalStyles.spacing.xl,
    alignItems: "center",
    gap: GlobalStyles.spacing.sm,
  },
  supportContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spacing.xs,
    backgroundColor: GlobalStyles.colors.gray50,
    paddingHorizontal: GlobalStyles.spacing.md,
    paddingVertical: GlobalStyles.spacing.sm,
    borderRadius: 12,
  },
  supportText: {
    fontSize: 13,
    color: GlobalStyles.colors.gray700,
    textAlign: "center",
    fontWeight: "500",
  },
  divider: {
    width: "60%",
    height: 1,
    backgroundColor: GlobalStyles.colors.gray100,
    marginVertical: GlobalStyles.spacing.sm,
  },
  copyrightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: GlobalStyles.spacing.xs,
    alignItems: "center",
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spacing.xxs,
  },
  versionText: {
    fontSize: 12,
    color: GlobalStyles.colors.gray600,
    fontWeight: "600",
  },
  copyrightText: {
    fontSize: 12,
    color: GlobalStyles.colors.gray600,
    fontWeight: "600",
  },
});
