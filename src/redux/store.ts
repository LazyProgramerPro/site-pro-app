import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import acceptanceRequestReducer from "./slices/acceptanceRequestSlice";
import authReducer from "./slices/authSlice";
import diaryReducer from "./slices/diarySlice";
import { acceptanceRequestSpecialFormReducer } from "./slices/formAcceptanceRequestSlice";
import projectReducer from "./slices/projectSlice";
import problemReducer from "./slices/problemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
    acceptanceRequest: acceptanceRequestReducer,
    acceptanceRequestSpecialForm: acceptanceRequestSpecialFormReducer,
    project: projectReducer,
    problem: problemReducer,
  },
});

// Lấy RootState và AppDispatch từ store của chúng ta.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
