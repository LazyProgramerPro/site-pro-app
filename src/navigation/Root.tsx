import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import { useAuthTokenRefresh } from "../hooks/useAuthTokenRefresh";
import { loadTokenFromStorage } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store"; // Import AppDispatch type
import { tokenService } from "../services/token-service";
import Navigation from "./Navigation";

export default function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useAppDispatch();

  useAuthTokenRefresh(); // Đảm bảo hook chạy trong Redux Provider context

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        await dispatch(loadTokenFromStorage());

        // Thiết lập cơ chế refresh token tự động
        tokenService.setupTokenRefresh();
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}
