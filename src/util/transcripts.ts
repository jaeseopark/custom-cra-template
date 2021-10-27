import Transcript from "typedef/Transcript";

export const compareChronologically = (t1: Transcript, t2: Transcript) =>
    (t1.lastMessage?.id || 0) - (t2.lastMessage?.id || 0);
