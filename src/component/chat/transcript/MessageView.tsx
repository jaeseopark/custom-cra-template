import cls from "classnames";

import IMFMessage, { IMFAttachment } from "typedef/IMFMessage";

import { getAttachmentUrl } from "redux/mdlwr";

import "style/MessageView.scss";
import HeicImg from "component/common/HeicImg";

type MessageViewProps = {
    message: IMFMessage;
};

const getAttachmentElement = ({ id, mimetype }: IMFAttachment) => {
    if (mimetype === "image/heic") {
        return <HeicImg src={getAttachmentUrl(id)} />;
    } else if (mimetype.startsWith("image/")) {
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

    const getText = () => {
        const hasText = !!message.content.text;
        if (!hasText) return null;
        return message.content.text!.trim();
    };

    return (
        <div className={clsView}>
            <div className={clsBubble}>
                {getAttachment()}
                {getText()}
            </div>
        </div>
    );
};

export default MessageView;
