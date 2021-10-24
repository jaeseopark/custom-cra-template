import styled from "styled-components";

import Transcript from "typedef/Transcript";
import Message from "./MessageView";

const StylizedTranscriptView = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
`;

type TranscriptViewProps = {
    transcript: Transcript;
};

const TranscriptView = ({ transcript }: TranscriptViewProps) => {
    // TODO: timestamp logic

    return (
        <StylizedTranscriptView>
            {transcript.messages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
        </StylizedTranscriptView>
    );
};

export default TranscriptView;
