import IMFError from "typedef/IMFError";
import IMFEvent from "typedef/IMFEvent";
import { IMFOutgoingMessage } from "typedef/IMFMessage";

export type IMFEventHandler = (event: IMFEvent) => void;
export type IMFErrorHandler = (error: IMFError) => void;

interface IMFClient {
    listen: (onEvent: IMFEventHandler, onError: IMFErrorHandler) => void;
    sendMessage: (msg: IMFOutgoingMessage) => void;
    isOnline: () => boolean;
}

export default IMFClient;
