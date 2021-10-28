import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectTranscript } from "redux/transcript/slice";
import MessageInput from "./MessageInput";
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

const ChatContainer = ({ alias }: ChatContainerProps) => {
    const transcript = useSelector(selectTranscript(alias));

    if (!transcript || !transcript.lastMessage) return null;

    return (
        <StylizedChatContainer>
            <ChatHeader name={alias} />
            <TranscriptView transcript={transcript} />
            <MessageInput
                handle={transcript.lastMessage.handle}
                service={transcript.lastMessage.service}
            />
        </StylizedChatContainer>
    );
};

const WithInputValidation = ({ alias }: { alias?: string }) => {
    if (!alias) return null;
    return <ChatContainer alias={alias} />;
};

export default WithInputValidation;
