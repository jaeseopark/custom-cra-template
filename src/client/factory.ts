import IMFClient, { IMFServerInfo } from "./interface";
import IMFMockClient from "./mock";
import IMFWebSocketClient from "./websocket";

class IMFClientFactory {
    static getClient = (serverInfo: IMFServerInfo): IMFClient => {
        if (serverInfo?.host === "MOCK") {
            return new IMFMockClient();
        }

        return new IMFWebSocketClient(serverInfo);
    };
}

export default IMFClientFactory;
