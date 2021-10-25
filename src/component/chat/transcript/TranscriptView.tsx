import styled from "styled-components";

import Transcript from "typedef/Transcript";
import MessageView from "./MessageView";

const StylizedTranscriptView = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
    padding: 10px 0 10px 0;
`;

type TranscriptViewProps = {
    transcript: Transcript;
};

const TranscriptView = ({ transcript }: TranscriptViewProps) => {
    // TODO: timestamp logic

    return (
        <StylizedTranscriptView>
            {transcript.messages.map((msg) => (
                <MessageView key={msg.id} message={msg} />
            ))}
        </StylizedTranscriptView>
    );
};

export default TranscriptView;
