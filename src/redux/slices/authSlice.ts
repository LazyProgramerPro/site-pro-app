import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

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

// Thunk: load token từ AsyncStorage
export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadToken",
  async () => {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
);

// Thunk: login và lưu token
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (user: AuthUser) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

// Thunk: logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadTokenFromStorage.fulfilled,
        (state, action: PayloadAction<AuthUser | null>) => {
          state.user = action.payload;
          state.isAuthenticated = !!action.payload;
          state.loading = false;
        }
      )
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
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
