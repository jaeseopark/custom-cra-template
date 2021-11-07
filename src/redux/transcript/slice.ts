import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import IMFEvent from "typedef/IMFEvent";
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
    lastNotified: number;
    selectedAlias?: string;
};

const initialState: TranscriptState = {
    contactMap: {},
    contactReverseMap: {},
    transcripts: {},
    lastNotified: 0,
};

const createTranscript = (): Transcript => ({
    messages: [],
    unreadMessageCount: 0,
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
    return initTranscript(state, msg);
};

export const transcriptSlice = createSlice({
    name: "transcript",
    initialState,
    reducers: {
        upsertMessages: (state, action: PayloadAction<IMFEvent>) => {
            action.payload.messages!.forEach((message) => {
                const transcript = getOrInitTranscript(state, message);
                if (message.status === "received" && action.payload.type === "MESSAGE_NEW") {
                    transcript.unreadMessageCount += 1;
                    state.lastNotified = Date.now();
                }

                const shouldAppend = !transcript.lastMessage || transcript.lastMessage!.id < message.id;
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
            state.transcripts[alias].unreadMessageCount = 0;
        },
        selectAlias: (state, action: PayloadAction<string>) => {
            state.selectedAlias = action.payload;
        },
    },
});

export const { upsertMessages, markTranscriptAsRead, selectAlias } = transcriptSlice.actions;

export const selectNames = (state: RootState) => {
    const mayContainDups = Object.values(state.transcript.contactReverseMap);
    return Array.from(new Set(mayContainDups));
};

export const selectTranscripts = (state: RootState) => state.transcript.transcripts;

export const selectTranscript = (name: string) => (state: RootState) => state.transcript.transcripts[name];

export const selectOneHandleByName = (name: string) => (state: RootState) => state.transcript.contactMap[name][0];

export const selectLastNotified = (state: RootState) => state.transcript.lastNotified;

export const selecteTotalUnreadMessageCount = (state: RootState) =>
    Object.values(state.transcript.transcripts).reduce((acc, t) => acc + t.unreadMessageCount, 0);

export const selectSelectedAlias = (state: RootState) => state.transcript.selectedAlias;

export const isSelectedAlias = (alias: string) => (state: RootState) => selectSelectedAlias(state) === alias;

export default transcriptSlice.reducer;
