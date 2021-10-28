import styled from "styled-components";
import cls from "classnames";

import IMFMessage from "typedef/IMFMessage";

import "style/MessageView.scss";

type MessageViewProps = {
    message: IMFMessage;
};

const MessageBubble = styled.div``;

const MessageView = ({ message }: MessageViewProps) => {
    const isReceivedObj = { "is-received": message.status === "received" };
    const clsView = cls("message-view", isReceivedObj);
    const clsBubble = cls("message-bubble", isReceivedObj);

    return (
        <div className={clsView}>
            <MessageBubble className={clsBubble}>{message.content.text}</MessageBubble>
        </div>
    );
};

export default MessageView;
