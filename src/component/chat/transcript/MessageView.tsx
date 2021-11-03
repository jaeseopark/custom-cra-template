import cls from "classnames";

import IMFMessage from "typedef/IMFMessage";

import "style/MessageView.scss";
import { getAttachmentUrl } from "redux/mdlwr";

type MessageViewProps = {
    message: IMFMessage;
};

const MessageView = ({ message }: MessageViewProps) => {
    const clsView = cls("message-view", message.status);
    const clsBubble = cls("message-bubble", message.status, message.service);

    const getAttachment = () => {
        if (message.content.attachment && message.content.attachment?.mimetype.startsWith("image")) {
            return <img src={getAttachmentUrl(message.content.attachment?.id as number)} alt="Attachment" />;
        }
        return "<Unsupported Attachment Type>";
    };

    const content = message.content.attachment?.mimetype ? getAttachment() : message.content.text;

    return (
        <div className={clsView}>
            <div className={clsBubble}>{content}</div>
        </div>
    );
};

export default MessageView;
