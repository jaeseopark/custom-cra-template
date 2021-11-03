// import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { IMFOutgoingMessage } from "../typedef/IMFMessage";
import { upsertMessages } from "redux/transcript/slice";
import { markServerInfoAsReady, updateConnectivity as updateSliceConnectivity } from "redux/connectivity/slice";
import IMFClientFactory from "client/factory";
import IMFClient, { IMFServerInfo } from "client/interface";

const CONNECTIVITY_CHECK_INTERVAL = 500; // ms

let imfClient: IMFClient;

export const initializeClient = (serverInfo: IMFServerInfo) => (dispatch: Dispatch) => {
    const client = IMFClientFactory.getClient(serverInfo);
    client.listen(
        (event) => {
            switch (event.type) {
                case "MESSAGE_NEW":
                case "MESSAGE_PRELOAD":
                    dispatch(upsertMessages(event));
                    break;
                default:
                    break;
            }
        },
        (error) => {
            // TODO: deal with this
        }
    );

    setInterval(() => {
        dispatch(updateSliceConnectivity(client.isOnline()));
    }, CONNECTIVITY_CHECK_INTERVAL);

    dispatch(markServerInfoAsReady());
    imfClient = client;
};

export const sendMessage = (msg: IMFOutgoingMessage) => {
    const sendToServer = () => {
        if (imfClient) imfClient.sendMessage(msg);
        else setTimeout(sendToServer, 1000);
    };
    sendToServer();
};

export const getAttachmentUrl = (attachmentId: number) => imfClient.getAttachmentUrl(attachmentId);
