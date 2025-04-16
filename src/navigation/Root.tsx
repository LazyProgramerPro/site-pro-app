import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import { loadTokenFromStorage } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store"; // Import AppDispatch type
import Navigation from "./Navigation";
export default function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        dispatch(loadTokenFromStorage());
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
