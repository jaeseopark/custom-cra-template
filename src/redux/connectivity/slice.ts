import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export type ConnectivityState = {
    isOnline: boolean;
    isServerInfoReady: boolean;
};

const initialState: ConnectivityState = {
    isOnline: false,
    isServerInfoReady: false,
};

export const connectivitySlice = createSlice({
    name: "connectivity",
    initialState,
    reducers: {
        markServerInfoAsReady: (state) => {
            state.isServerInfoReady = true;
        },
        updateConnectivity: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
    },
});

export const { updateConnectivity, markServerInfoAsReady } = connectivitySlice.actions;

export const selectConnectivity = (state: RootState) => state.connectivity.isOnline;

export const selectIsServerInfoReady = (state: RootState) => state.connectivity.isServerInfoReady;

export default connectivitySlice.reducer;
