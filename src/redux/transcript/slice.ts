import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import IMFMessage from "typedef/IMFMessage";
import Transcript from "typedef/Transcript";
import { insertAt } from "util/arrays";

type PersonName = string;

type TranscriptState = {
    contactMap: {
        [name: string]: string[];
    };
    contactReverseMap: {
        [handle: string]: PersonName;
    };
    transcripts: {
        [personName: string]: Transcript;
    };
};

const initialState: TranscriptState = {
    contactMap: {},
    contactReverseMap: {},
    transcripts: {},
};

const createTranscript = (): Transcript => ({
    messages: [],
    hasUnreadMessages: false,
});

const initTranscript = (state: TranscriptState, msg: IMFMessage): Transcript => {
    const newTranscript = createTranscript();

    state.contactMap[msg.alias] = [msg.handle];
    state.contactReverseMap[msg.handle] = msg.alias;
    state.transcripts[msg.alias] = newTranscript;

    return newTranscript;
};

const getOrInitTranscript = (state: TranscriptState, msg: IMFMessage) => {
    let transcript = state.transcripts[msg.alias];
    if (transcript) return transcript;

    console.log("Could not find transcript for alias:", msg.alias);
    return initTranscript(state, msg);
};

export const transcriptSlice = createSlice({
    name: "transcript",
    initialState,
    reducers: {
        upsertMessages: (state, action: PayloadAction<IMFMessage[]>) => {
            action.payload.forEach((message) => {
                const transcript = getOrInitTranscript(state, message);
                if (message.status === "received") {
                    transcript.hasUnreadMessages = true;
                }

                const shouldAppend =
                    !transcript.lastMessage || transcript.lastMessage!.id < message.id;
                if (shouldAppend) {
                    transcript.messages.push(message);
                    transcript.lastMessage = message;
                    return;
                }

                const i = transcript.messages.indexOf(message);
                if (i >= 0) {
                    // message.id already exists in the array. update.
                    transcript.messages.splice(i, 1, message);
                    if (transcript.lastMessage!.id === message.id) {
                        transcript.lastMessage = message;
                    }
                } else {
                    // message belongs somewhere in the middle
                    const j = transcript.messages.findIndex((m) => m.id > message.id);
                    insertAt(transcript.messages, message, j);
                }
            });
        },
        markTranscriptAsRead: (state, action: PayloadAction<string>) => {
            const alias = action.payload;
            state.transcripts[alias].hasUnreadMessages = false;
        },
    },
});

export const { upsertMessages, markTranscriptAsRead } = transcriptSlice.actions;

export const selectNames = (state: RootState) => {
    const mayContainDups = Object.values(state.transcript.contactReverseMap);
    return Array.from(new Set(mayContainDups));
};

export const selectTranscripts = (state: RootState) => state.transcript.transcripts;

export const selectTranscript = (name: string) => (state: RootState) =>
    state.transcript.transcripts[name];

export const selectOneHandleByName = (name: string) => (state: RootState) =>
    state.transcript.contactMap[name][0];

export default transcriptSlice.reducer;
