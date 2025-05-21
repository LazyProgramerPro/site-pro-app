import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Types
interface AuthUser {
  access_token: string;
  token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_created_at: string;
  refresh_token_created_at: string;
  username: string;
  is_active: boolean;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // Thời điểm hết hạn của token (timestamp)
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthPayload {
  token: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
  isAuthenticated: false,
  loading: true,
};

// Thunk: load token từ AsyncStorage
export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadToken",
  async () => {
    const user = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const expiresAtStr = await AsyncStorage.getItem("expiresAt");
    const expiresAt = expiresAtStr ? parseInt(expiresAtStr) : null;

    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
      refreshToken: refreshToken || null,
      expiresAt: expiresAt,
    };
  }
);

// Thunk: login và lưu token
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (user: AuthUser) => {
    // Tính thời gian hết hạn dựa vào expires_in từ response
    const expiresAt = Date.now() + user.expires_in * 1000;

    // Lưu đầy đủ thông tin vào AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", user.access_token || user.token);
    await AsyncStorage.setItem("refreshToken", user.refresh_token);
    await AsyncStorage.setItem("expiresAt", expiresAt.toString());

    return {
      user,
      token: user.access_token || user.token,
      refreshToken: user.refresh_token,
      expiresAt,
    };
  }
);

// Action để cập nhật token sau khi refresh
export const saveAuth = createAsyncThunk(
  "auth/saveAuth",
  async (authPayload: AuthPayload) => {
    await AsyncStorage.setItem("token", authPayload.token);
    await AsyncStorage.setItem("refreshToken", authPayload.refreshToken);
    await AsyncStorage.setItem("expiresAt", authPayload.expiresAt.toString());
    if (authPayload.user) {
      await AsyncStorage.setItem("user", JSON.stringify(authPayload.user));
    }
    return authPayload;
  }
);

// Thunk: logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("expiresAt");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTokenFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.expiresAt = action.payload.expiresAt;
        state.isAuthenticated = !!action.payload.token;
        state.loading = false;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.expiresAt = action.payload.expiresAt;
        state.isAuthenticated = true;
      })
      .addCase(saveAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.expiresAt = action.payload.expiresAt;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.expiresAt = null;
        state.isAuthenticated = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (state.loading) {
            state.loading = false;
          }
        }
      )
      .addDefaultCase((state, action) => {
        // console.log(`action type: ${action.type}`, current(state))
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
