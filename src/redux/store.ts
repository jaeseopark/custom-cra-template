import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import transcriptReducer from "redux/transcript/slice";
import connectivityReducer from "redux/connectivity/slice";

export const store = configureStore({
    reducer: {
        transcript: transcriptReducer,
        connectivity: connectivityReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
