import IMFMessage from "./IMFMessage";

type Transcript = {
    messages: IMFMessage[];
    lastMessage?: IMFMessage;
    hasUnreadMessages: boolean;
    // to disply activity labels
    // lastSent: number;
    // lastReceived: number;
    // lastReadByMe: number;
    // lastReadByOther: number;
};

export default Transcript;
