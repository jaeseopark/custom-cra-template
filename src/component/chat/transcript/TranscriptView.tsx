import styled from "styled-components";

import Transcript from "typedef/Transcript";
import MessageView from "./MessageView";

const StylizedTranscriptView = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
    padding-bottom: 10px;
    padding-top: 7px; // the remaining 3px comes from the message bubble, which has a 3px top-margin.
`;

type TranscriptViewProps = {
    transcript: Transcript;
};

const TranscriptView = ({ transcript }: TranscriptViewProps) => (
    <StylizedTranscriptView>
        {transcript.messages.map((msg) => (
            <MessageView key={msg.id} message={msg} />
        ))}
    </StylizedTranscriptView>
);

export default TranscriptView;
