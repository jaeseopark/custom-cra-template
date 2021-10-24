import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";

type MessageViewProps = {
    message: IMFMessage;
};

const StylizedMessageView = styled.div`
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
    border-radius: 20px;
    padding: 3px;
`;

const MessageView = ({ message }: MessageViewProps) => {
    return <StylizedMessageView message={message}>{message.content.text}</StylizedMessageView>;
};

export default MessageView;
