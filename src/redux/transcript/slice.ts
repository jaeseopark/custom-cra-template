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
        [phoneOrEmail: string]: PersonName;
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

/**
 * Pre-condition: transcript already exists
 */
const getTranscript = (state: TranscriptState, msg: IMFMessage) => {
    const personName = state.contactReverseMap[msg.phoneOrEmail];
    return state.transcripts[personName];
};

const initTranscript = (state: TranscriptState, msg: IMFMessage) => {
    const newTranscript = {
        messages: [],
        messageIndex: {},
    };

    const name = getHuman();
    state.contactMap[name] = [msg.phoneOrEmail];
    state.contactReverseMap[msg.phoneOrEmail] = name;
    state.transcripts.Unknown = newTranscript;

    return newTranscript;
};

export const transcriptSlice = createSlice({
    name: "transcript",
    initialState,
    reducers: {
        addPeople: (state, action: PayloadAction<Person[]>) => {
            action.payload.forEach((person) => {
                person.phoneOrEmail.forEach((poe) => {
                    state.contactReverseMap[poe] = person.name;
                });
                state.contactMap[person.name] = person.phoneOrEmail;
                state.transcripts[person.name] = {
                    messages: [],
                    messageIndex: {},
                };
            });
        },
        addMessage: (state, action: PayloadAction<IMFMessage>) => {
            const transcript = getTranscript(state, action.payload) || initTranscript(state, action.payload);
            transcript.messages.push(action.payload);
            transcript.messageIndex[action.payload.id] = transcript.messages.length - 1;
        },
        updateMessage: (state, action: PayloadAction<IMFMessage>) => {
            const transcript = getTranscript(state, action.payload);
            const i = transcript.messageIndex[action.payload.id];
            transcript.messages.splice(i, 1, action.payload);
        },
    },
});

export const { addPeople, addMessage, updateMessage } = transcriptSlice.actions;

export const selectNames = (state: RootState) => {
    const mayContainDups = Object.values(state.transcript.contactReverseMap);
    return Array.from(new Set(mayContainDups));
};

export const selectTranscript = (name: string) => (state: RootState) => state.transcript.transcripts[name];

export const selectPhoneOrEmailByName = (name: string) => (state: RootState) => state.transcript.contactMap[name];

export const selectOnePhoneOrEmailByName = (name: string) => (state: RootState) => state.transcript.contactMap[name][0];

export default transcriptSlice.reducer;
