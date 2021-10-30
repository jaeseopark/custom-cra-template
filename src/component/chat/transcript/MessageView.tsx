import styled from "styled-components";
import cls from "classnames";

import IMFMessage from "typedef/IMFMessage";

import "style/MessageView.scss";

type MessageViewProps = {
    message: IMFMessage;
};

const MessageBubble = styled.div``;

const MessageView = ({ message }: MessageViewProps) => {
    const clsView = cls("message-view", message.status);
    const clsBubble = cls("message-bubble", message.status, message.service);

    return (
        <div className={clsView}>
            <MessageBubble className={clsBubble}>{message.content.text}</MessageBubble>
        </div>
    );
};

export default MessageView;
