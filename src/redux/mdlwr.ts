// import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import IMFClient from "../client/imf";
import { IMFOutgoingMessage } from "../typedef/IMFMessage";
import { upsertMessages } from "redux/transcript/slice";
import { updateConnectivity as updateSliceConnectivity } from "redux/connectivity/slice";
import { getReactEnv } from "util/env";

let imfClient: IMFClient;

export const initializeClient = () => (dispatch: Dispatch) => {
    const host = getReactEnv("IMF_HOST");
    const port = getReactEnv("IMF_PORT");
    const client = new IMFClient(host!, port!);
    client.onEvent((event) => {
        if (event.messages) {
            dispatch(upsertMessages(event.messages));
        }
    });
    client.setOnError((error) => {
        // TODO: deal with this
    });

    imfClient = client;
};

export const sendMessage = (msg: IMFOutgoingMessage) => {
    const sendToServer = () => {
        if (imfClient) imfClient.sendMessage(msg);
        else setTimeout(sendToServer, 1000);
    };
    sendToServer();
};

export const updateConnectivity = () => (dispatch: Dispatch) => {
    if (imfClient) {
        dispatch(updateSliceConnectivity(imfClient.isOnline()));
    }
};
