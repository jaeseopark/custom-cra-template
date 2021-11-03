import cls from "classnames";

import IMFMessage, { IMFAttachment } from "typedef/IMFMessage";

import "style/MessageView.scss";
import { getAttachmentUrl } from "redux/mdlwr";

type MessageViewProps = {
    message: IMFMessage;
};

const getAttachment = ({ id, mimetype }: IMFAttachment) => {
    if (mimetype.startsWith("image/") && !mimetype.includes("heic")) {
        return <img src={getAttachmentUrl(id)} alt="Attachment" />;
    }
    return `<Unsupported: ${mimetype}>`;
};

const MessageView = ({ message }: MessageViewProps) => {
    const clsView = cls("message-view", message.status);
    const clsBubble = cls("message-bubble", message.status, message.service);
    const hasAttachment = !!message.content.attachment?.id;

    const content = hasAttachment ? getAttachment(message.content.attachment!) : message.content.text;

    return (
        <div className={clsView}>
            <div className={clsBubble}>{content}</div>
        </div>
    );
};

export default MessageView;
