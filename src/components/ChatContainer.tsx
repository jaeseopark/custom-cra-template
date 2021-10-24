import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectOnePhoneOrEmailByName, selectTranscript } from "redux/transcript/slice";
import MessageComposeView from "./MessageComposeView";
import TranscriptView from "./TranscriptView";

const StylizedChatContainer = styled.div`
    flex-grow: 1;
`;

type ChatContainerProps = {
    name: string;
};

const ChatContainer = ({ name }: ChatContainerProps) => {
    const transcript = useSelector(selectTranscript(name));
    const defaultPhoneOrEmail = useSelector(selectOnePhoneOrEmailByName(name));

    const phoneOrEmail = useMemo<string>(() => {
        if (transcript && transcript.messages.length > 0) {
            // there is a previous chat history. use the most recent number/email.
            return transcript.messages[transcript.messages.length - 1].phoneOrEmail;
        }

        return defaultPhoneOrEmail;
    }, [defaultPhoneOrEmail, transcript]);

    return (
        <StylizedChatContainer>
            <TranscriptView transcript={transcript} />
            <MessageComposeView phoneOrEmail={phoneOrEmail} />
        </StylizedChatContainer>
    );
};

export default ChatContainer;
