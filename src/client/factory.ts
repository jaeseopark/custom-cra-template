import IMFClient from "./interface";
import IMFMockClient from "./mock";
import IMFWebSocketClient from "./websocket";

class IMFClientFactory {
    static getClient = (): IMFClient => {
        if (process.env.REACT_APP_IMF_MOCK === "ON") {
            return new IMFMockClient();
        }

        const host = process.env.IMF_HOST!;
        const port = process.env.IMF_PORT!;
        return new IMFWebSocketClient(host, port);
    };
}

export default IMFClientFactory;
