import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectTranscript } from "redux/transcript/slice";
import MessageInput, { MessageComposeViewProps } from "./MessageInput";
import TranscriptView from "component/chat/transcript/TranscriptView";
import ChatHeader from "./ChatHeader";

const StylizedChatContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
`;

type ChatContainerProps = {
    alias: string;
};

const ChatContainer = ({ alias: name }: ChatContainerProps) => {
    const transcript = useSelector(selectTranscript(name));

    const mcvp = useMemo<MessageComposeViewProps>(() => {
        if (transcript && transcript.lastMessage) {
            return {
                handle: transcript.lastMessage.handle,
                service: transcript.lastMessage.service,
            };
        }

        throw new Error("Unsupported: creating a new transcript");
    }, [transcript]);

    return (
        <StylizedChatContainer>
            <ChatHeader name={name} />
            <TranscriptView transcript={transcript} />
            <MessageInput handle={mcvp.handle} service={mcvp.service} />
        </StylizedChatContainer>
    );
};

export default ChatContainer;
