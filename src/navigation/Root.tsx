import AsyncStorage from "@react-native-async-storage/async-storage";
// AppLoading từ 'expo-app-loading' đã lỗi thời.
// Cân nhắc sử dụng 'expo-splash-screen' để có trải nghiệm người dùng tốt hơn.
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";

import { loadTokenFromStorage } from "../redux/slices/authSlice";
// Import thêm useAppSelector để lấy token từ Redux store
import { useAppDispatch, useAppSelector } from "../redux/store";
import Navigation from "./Navigation";

export default function Root() {
  // State để quản lý quá trình khởi tạo (kiểm tra token trong AsyncStorage)
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useAppDispatch();

  // Lấy authToken từ Redux store (giả sử slice 'auth' có trường 'token')
  const authToken = useAppSelector((state) => state.auth.token);

  // Effect này chạy một lần khi component mount để cố gắng tải token từ AsyncStorage
  useEffect(() => {
    async function tryLoadTokenFromStorage() {
      try {
        // Action `loadTokenFromStorage` sẽ đọc token từ AsyncStorage
        // và dispatch một action khác (ví dụ: `setToken`) để cập nhật Redux store.
        await dispatch(loadTokenFromStorage());
      } catch (error) {
        console.error("Lỗi khi tải token từ AsyncStorage:", error);
        // Xử lý lỗi nếu cần
      } finally {
        // Đánh dấu quá trình khởi tạo đã hoàn tất
        setIsInitializing(false);
      }
    }

    tryLoadTokenFromStorage();
  }, [dispatch]); // Chỉ chạy một lần khi component mount

  // Hiển thị màn hình loading trong khi đang kiểm tra token
  if (isInitializing) {
    // TODO: Thay thế AppLoading bằng giải pháp splash screen hiện đại hơn
    // ví dụ: sử dụng SplashScreen.hideAsync() từ 'expo-splash-screen'
    // sau khi isInitializing là false để tránh giật màn hình.
    return <AppLoading />;
  }

  // Render cấu trúc navigation chính của ứng dụng
  return <Navigation />;
}
