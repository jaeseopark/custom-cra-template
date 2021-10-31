import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMFClientFactory from "client/factory";
import { IMFServerInfo } from "client/interface";
import { RootState } from "redux/store";

export type ConnectivityState = {
    isOnline: boolean;
    serverInfo?: IMFServerInfo;
};

const initialState: ConnectivityState = {
    isOnline: false,
};

export const connectivitySlice = createSlice({
    name: "connectivity",
    initialState,
    reducers: {
        setServerInfo: (state, action: PayloadAction<IMFServerInfo>) => {},
        updateConnectivity: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
    },
});

export const { updateConnectivity } = connectivitySlice.actions;

export const selectConnectivity = (state: RootState) => state.connectivity.isOnline;

export const selectIsServerInfoReady = (state: RootState) =>
    IMFClientFactory.isMock() || !!state.connectivity.serverInfo;

export default connectivitySlice.reducer;
