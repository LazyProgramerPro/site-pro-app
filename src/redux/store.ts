import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./slices/authSlice";
import diaryReducer from "./slices/diarySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
  },
});

// Lấy RootState và AppDispatch từ store của chúng ta.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
