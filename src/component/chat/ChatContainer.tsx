import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { markTranscriptAsRead, selectSelectedAlias, selectTranscript } from "redux/transcript/slice";
import MessageInput from "./MessageInput";
import TranscriptView from "component/chat/transcript/TranscriptView";
import ChatHeader from "./ChatHeader";

const StyledChatContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
`;

type ChatContainerProps = {
    alias: string;
};

const ChatContainer = ({ alias }: ChatContainerProps) => {
    const dispatch = useDispatch();
    const transcript = useSelector(selectTranscript(alias));

    if (!transcript || !transcript.lastMessage) return null;

    return (
        <StyledChatContainer>
            <ChatHeader name={alias} />
            <TranscriptView transcript={transcript} markAsRead={() => dispatch(markTranscriptAsRead(alias))} />
            <MessageInput handle={transcript.lastMessage.handle} service={transcript.lastMessage.service} />
        </StyledChatContainer>
    );
};

const ChatContainerWithAliasValidation = () => {
    const alias = useSelector(selectSelectedAlias);
    if (!alias) return null;
    return <ChatContainer alias={alias} />;
};

export default ChatContainerWithAliasValidation;
