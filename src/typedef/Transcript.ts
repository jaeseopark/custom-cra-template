import IMFMessage from "./IMFMessage";

type Transcript = {
    messages: IMFMessage[];
    messageIndex: { [messageId: string]: number };
    // to disply activity labels
    // lastSent: number;
    // lastReceived: number;
    // lastReadByMe: number;
    // lastReadByOther: number;
};

export default Transcript;
