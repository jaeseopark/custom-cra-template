import ReconnectingWebSocket from "reconnecting-websocket";

import IMFError from "typedef/IMFError";
import IMFEvent from "typedef/IMFEvent";
import { IMFOutgoingMessage } from "typedef/IMFMessage";
import Person from "typedef/Person";

type IMFEventHandler = (msg: IMFEvent) => void;
type IMFErrorHandler = (error: IMFError) => void;

class IMFClient {
    private host: string;
    private port: string;

    private messageSocket: ReconnectingWebSocket;

    private onEventHandler?: IMFEventHandler;
    private onError?: IMFErrorHandler;

    constructor(host: string, port: string) {
        this.host = host;
        this.port = port;

        const url = `ws://${this.host}:${this.port}/`;
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
            else if (this.onEventHandler) this.onEventHandler(dataJson as IMFEvent);
            else console.log(dataJson);
        };
    }

    onEvent = (onEventHandler: IMFEventHandler) => {
        this.onEventHandler = onEventHandler;
    };

    setOnError = (onError: IMFErrorHandler) => {
        this.onError = onError;
    };

    fetchContacts(): Promise<Person[]> {
        const url = `http://${this.host}:${this.port}/contacts`;
        return (
            fetch(url)
                .then((res) => res.json())
                // .then(addRandomContacts)
                .then((resJson) => {
                    return Object.keys(resJson).map((name) => ({
                        name,
                        handles: [resJson[name]],
                    }));
                })
        );
    }

    sendMessage(msg: IMFOutgoingMessage) {
        this.messageSocket.send(JSON.stringify(msg));
    }

    isOnline(): boolean {
        return this.messageSocket.readyState === WebSocket.OPEN;
    }
}

export default IMFClient;
