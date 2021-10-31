import IMFClient from "./interface";
import IMFMockClient from "./mock";
import IMFWebSocketClient from "./websocket";

class IMFClientFactory {
    static isMock = () => process.env.REACT_APP_IMF_MOCK === "ON";

    static getClient = (): IMFClient => {
        if (this.isMock()) {
            return new IMFMockClient();
        }

        const host = process.env.REACT_APP_IMF_HOST!;
        const port = process.env.REACT_APP_IMF_PORT!;
        return new IMFWebSocketClient(host, port);
    };
}

export default IMFClientFactory;
