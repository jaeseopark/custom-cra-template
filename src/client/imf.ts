import ReconnectingWebSocket from "reconnecting-websocket";
import IMFMessage from "typedef/IMFMessage";
import Person from "typedef/Person";

type OnMessageType = (msg: IMFMessage) => void;

class IMFClient {
    private host: string;
    private port: string;

    private messageSocket: ReconnectingWebSocket;

    constructor(host: string, port: string) {
        this.host = host;
        this.port = port;

        const url = `ws://${this.host}:${this.port}/msg`;
        this.messageSocket = new ReconnectingWebSocket(url);
    }

    fetchContacts(): Promise<Person[]> {
        const url = `http://${this.host}:${this.port}/contacts`;
        return fetch(url)
            .then((res) => res.json())
            .then((resJson) => {
                return Object.keys(resJson).map((name) => ({
                    name,
                    phoneOrEmail: [resJson[name]],
                }));
            });
    }

    sendMessage(msg: IMFMessage) {
        this.messageSocket.send(JSON.stringify(msg));
    }

    isOnline(): boolean {
        return this.messageSocket.readyState === WebSocket.OPEN;
    }

    setOnMessage = (onMessage: OnMessageType) => {
        this.messageSocket.onmessage = (event) => {
            const message: IMFMessage = JSON.parse(event.data);
            onMessage(message);
        };
    };
}

export default IMFClient;
