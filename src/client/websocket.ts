import ReconnectingWebSocket from "reconnecting-websocket";

import IMFError from "typedef/IMFError";
import IMFEvent from "typedef/IMFEvent";
import { IMFOutgoingMessage } from "typedef/IMFMessage";
import IMFClient, { IMFErrorHandler, IMFEventHandler, IMFServerInfo } from "./interface";

class IMFWebSocketClient implements IMFClient {
    private messageSocket: ReconnectingWebSocket;

    private onEvent?: IMFEventHandler;
    private onError?: IMFErrorHandler;

    constructor(serverInfo: IMFServerInfo) {
        const url = `ws://${serverInfo.host}:${serverInfo.port}/`;
        this.messageSocket = new ReconnectingWebSocket(url);
        this.messageSocket.onmessage = ({ data }) => {
            let dataJson;
            try {
                dataJson = JSON.parse(data);
            } catch (error) {
                console.error(data);
                return;
            }
            if (dataJson.error && this.onError) this.onError(dataJson as IMFError);
            else if (this.onEvent) this.onEvent(dataJson as IMFEvent);
            else console.log(dataJson);
        };
    }

    listen = (onEvent: IMFEventHandler, onError: IMFErrorHandler) => {
        this.onEvent = onEvent;
        this.onError = onError;
    };

    sendMessage = (msg: IMFOutgoingMessage) => {
        this.messageSocket.send(JSON.stringify(msg));
    };

    isOnline = (): boolean => {
        return this.messageSocket.readyState === WebSocket.OPEN;
    };

    // TODO: maybe?
    // fetchContacts(): Promise<Person[]> {
    //     const url = `http://${this.host}:${this.port}/contacts`;
    //     return (
    //         fetch(url)
    //             .then((res) => res.json())
    //             // .then(addRandomContacts)
    //             .then((resJson) => {
    //                 return Object.keys(resJson).map((name) => ({
    //                     name,
    //                     handles: [resJson[name]],
    //                 }));
    //             })
    //     );
    // }
}

export default IMFWebSocketClient;
