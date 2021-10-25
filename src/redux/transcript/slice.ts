import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import IMFMessage from "typedef/IMFMessage";
import Person from "typedef/Person";
import Transcript from "typedef/Transcript";
import { getHuman } from "util/rand";

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

const initTranscript = (state: TranscriptState, msg: IMFMessage) => {
    const newTranscript = {
        messages: [],
        messageIndex: {},
    };

    state.contactMap[msg.conversation.alias] = [msg.conversation.handle];
    state.contactReverseMap[msg.conversation.handle] = msg.conversation.alias;
    state.transcripts[msg.conversation.alias] = newTranscript;

    return newTranscript;
};

const getOrInitTranscript = (state: TranscriptState, msg: IMFMessage) => {
    let transcript =  state.transcripts[msg.conversation.alias];
    if (transcript) return transcript;

    console.log("Could not find transcript for alias:", msg.conversation.alias);
    return initTranscript(state, msg);
}

export const transcriptSlice = createSlice({
    name: "transcript",
    initialState,
    reducers: {
        addPeople: (state, action: PayloadAction<Person[]>) => {
            action.payload.forEach((person) => {
                person.handles.forEach((poe) => {
                    state.contactReverseMap[poe] = person.name;
                });
                state.contactMap[person.name] = person.handles;
                state.transcripts[person.name] = {
                    messages: [],
                    messageIndex: {},
                };
            });
        },
        upsertMessage: (state, action: PayloadAction<IMFMessage>) => {
            const transcript = getOrInitTranscript(state, action.payload);
            const i = transcript.messageIndex[action.payload.id];
            if (i >= 0) {
                transcript.messages.splice(i, 1, action.payload);
            } else {
                transcript.messages.push(action.payload);
                transcript.messageIndex[action.payload.id] = transcript.messages.length - 1;
            }
        },
    },
});

export const { addPeople, upsertMessage } = transcriptSlice.actions;

export const selectNames = (state: RootState) => {
    const mayContainDups = Object.values(state.transcript.contactReverseMap);
    return Array.from(new Set(mayContainDups));
};

export const selectTranscript = (name: string) => (state: RootState) =>
    state.transcript.transcripts[name];

export const selectOneHandleByName = (name: string) => (state: RootState) =>
    state.transcript.contactMap[name][0];

export default transcriptSlice.reducer;
