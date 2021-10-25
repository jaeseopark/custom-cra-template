import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectOneHandleByName, selectTranscript } from "redux/transcript/slice";
import MessageInput from "./MessageInput";
import TranscriptView from "component/chat/transcript/TranscriptView";
import ChatHeader from "./ChatHeader";
import { Conversation } from "typedef/IMFMessage";

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
    const defaultHandle = useSelector(selectOneHandleByName(name));

    const conversation = useMemo<Conversation>(() => {
        const getHandle = () => {
            if (transcript && transcript.messages.length > 0) {
                // there is a previous chat history. use the most recent number/email.
                return transcript.messages[transcript.messages.length - 1].conversation.handle;
            }

            return defaultHandle;
        };

        return {
            handle: getHandle(),
            alias: name,
            isGroup: false,
        };
    }, [defaultHandle, name, transcript]);

    return (
        <StylizedChatContainer>
            <ChatHeader name={name} />
            <TranscriptView transcript={transcript} />
            <MessageInput conversation={conversation} />
        </StylizedChatContainer>
    );
};

export default ChatContainer;
