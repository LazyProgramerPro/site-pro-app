import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
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
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    loginHandler(data);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Đăng nhập tài khoản SitePro
      </Text>

      <Text style={styles.subtext}>
        Vui Lòng đăng nhập tài khoản SitePro của bạn.
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
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Vui lòng nhập mật khẩu" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Mật khẩu"
            placeholder="Đăng nhập tài khoản SitePro"
            secureTextEntry
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            style={styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
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
          />
        )}
      />
      {errors.server && (
        <Text style={styles.errorText}>{errors.server.message}</Text>
      )}

      {/* Đăng nhập */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Đăng Nhập
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    marginBottom: 24,
    fontSize: 14,
    color: "white",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
});
