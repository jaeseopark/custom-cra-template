import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";

type MessageViewProps = {
    message: IMFMessage;
};

const StylizedMessageView = styled.div`
    display: flex;
    justify-content: flex-end; // TODO: make this dynamic
    margin: 0 10px 0 10px;
`;

const MessageBubble = styled.div`
    ${({ message }: MessageViewProps) => {
        const isReceived = message.status === "received";
        if (isReceived) {
            return `
                background-color: gray;
            `;
        } else {
            return `
                background-color: blue;
                color: white;
            `;
        }
    }}
    max-width: 400px;
    border-radius: 12px;
    padding: 3px;
`;

const Message = ({ message }: MessageViewProps) => {
    return (
        <StylizedMessageView>
            <MessageBubble message={message}>{message.content.text}</MessageBubble>
            {message.status}
        </StylizedMessageView>
    );
};

export default Message;
