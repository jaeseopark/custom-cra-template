// import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { IMFOutgoingMessage } from "../typedef/IMFMessage";
import { upsertMessages } from "redux/transcript/slice";
import { updateConnectivity as updateSliceConnectivity } from "redux/connectivity/slice";
import IMFClientFactory from "client/factory";
import IMFClient from "client/interface";

let imfClient: IMFClient;

export const initializeClient = () => (dispatch: Dispatch) => {
    const client = IMFClientFactory.getClient();
    client.listen(
        (event) => {
            if (event.messages) {
                dispatch(upsertMessages(event.messages));
            }
        },
        (error) => {
            // TODO: deal with this
        }
    );

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
