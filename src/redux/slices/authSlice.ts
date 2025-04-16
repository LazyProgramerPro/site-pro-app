import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: true,
};

// Thunk: load token từ AsyncStorage
export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadToken",
  async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  }
);

// Thunk: login và lưu token
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (token: string) => {
    await AsyncStorage.setItem("token", token);
    return token;
  }
);

// Thunk: logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadTokenFromStorage.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.token = action.payload;
          state.isAuthenticated = !!action.payload;
          state.loading = false;
        }
      )
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
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
