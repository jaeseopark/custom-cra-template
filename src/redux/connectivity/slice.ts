import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export type ConnectivityState = {
    isOnline: boolean;
};

const initialState: ConnectivityState = {
    isOnline: false,
};

export const connectivitySlice = createSlice({
    name: "connectivity",
    initialState,
    reducers: {
        updateConnectivity: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
    },
});

export const { updateConnectivity } = connectivitySlice.actions;

export const selectConnectivity = (state: RootState) => state.connectivity.isOnline;

export default connectivitySlice.reducer;
