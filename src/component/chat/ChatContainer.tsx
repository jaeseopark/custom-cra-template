import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectOnePhoneOrEmailByName, selectTranscript } from "redux/transcript/slice";
import MessageInput from "./MessageInput";
import TranscriptView from "component/chat/transcript/TranscriptView";
import ChatHeader from "./ChatHeader";

const StylizedChatContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
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
            <ChatHeader name={name} />
            <TranscriptView transcript={transcript} />
            <MessageInput phoneOrEmail={phoneOrEmail} />
        </StylizedChatContainer>
    );
};

export default ChatContainer;
