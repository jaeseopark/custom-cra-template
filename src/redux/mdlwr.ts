// import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import IMFClient from "../client/imf";
import IMFMessage, { IMFOutgoingMessage } from "../typedef/IMFMessage";
import { addPeople, upsertMessages } from "redux/transcript/slice";
import { updateConnectivity as updateSliceConnectivity } from "redux/connectivity/slice";

let imfClient: IMFClient;

export const initializeClient = () => (dispatch: Dispatch) => {
    const host = process.env.SERVER_HOST || (process.env.REACT_APP_SERVER_HOST!);
    const port = process.env.REACT_APP_SERVER_PORT!;
    const client = new IMFClient(host, port);
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
