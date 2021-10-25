import ReconnectingWebSocket from "reconnecting-websocket";

import IMFError from "typedef/IMFError";
import IMFMessage from "typedef/IMFMessage";
import Person from "typedef/Person";
import { getHuman } from "util/rand";

type OnMessageType = (msg: IMFMessage) => void;
type OnErrorType = (error: IMFError) => void;

// @ts-ignore
const addRandomContacts = (resJson) => {
    for (let index = 0; index < 25; index++) {
        const randomName = `${getHuman()} ${getHuman()}`;
        resJson[randomName] = `${index}-${randomName}`;
    }
    return resJson;
};
class IMFClient {
    private host: string;
    private port: string;

    private messageSocket: ReconnectingWebSocket;

    private onMessage?: OnMessageType;
    private onError?: OnErrorType;

    constructor(host: string, port: string) {
        this.host = host;
        this.port = port;

        const url = `ws://${this.host}:${this.port}/msg`;
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
            else if (this.onMessage) this.onMessage(dataJson as IMFMessage);
            else console.log(dataJson);
        };
    }

    setOnMessage = (onMessage: OnMessageType) => {
        this.onMessage = onMessage;
    };

    setOnError = (onError: OnErrorType) => {
        this.onError = onError;
    };

    fetchContacts(): Promise<Person[]> {
        const url = `http://${this.host}:${this.port}/contacts`;
        return fetch(url)
            .then((res) => res.json())
            // .then(addRandomContacts)
            .then((resJson) => {
                return Object.keys(resJson).map((name) => ({
                    name,
                    handles: [resJson[name]],
                }));
            });
    }

    sendMessage(msg: IMFMessage) {
        this.messageSocket.send(JSON.stringify(msg));
    }

    isOnline(): boolean {
        return this.messageSocket.readyState === WebSocket.OPEN;
    }
}

export default IMFClient;
