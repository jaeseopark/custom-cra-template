import cls from "classnames";

import IMFMessage, { IMFAttachment } from "typedef/IMFMessage";

import "style/MessageView.scss";
import { getAttachmentUrl } from "redux/mdlwr";

type MessageViewProps = {
    message: IMFMessage;
};

const getAttachmentElement = ({ id, mimetype }: IMFAttachment) => {
    if (mimetype.startsWith("image/") && !mimetype.includes("heic")) {
        return <img src={getAttachmentUrl(id)} alt="Attachment" />;
    }
    return `<Unsupported: ${mimetype}>`;
};

const MessageView = ({ message }: MessageViewProps) => {
    const clsView = cls("message-view", message.status);
    const clsBubble = cls("message-bubble", message.status, message.service);

    const getAttachment = () => {
        const hasAttachment = !!message.content.attachment?.mimetype;
        if (!hasAttachment) return null;
        return getAttachmentElement(message.content.attachment!);
    };

    return (
        <div className={clsView}>
            <div className={clsBubble}>
                {getAttachment()}
                {message.content.text}
            </div>
        </div>
    );
};

export default MessageView;
