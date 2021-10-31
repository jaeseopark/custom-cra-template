import { useEffect, useState } from "react";
import styled from "styled-components";
import { InputBase } from "@mui/material";

import { sendMessage } from "redux/mdlwr";
import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";
import { IMFService } from "typedef/IMFMessage";

const ENTER_KEY = "Enter";

type MessageComposeViewProps = {
    handle: string;
    service: IMFService;
};

const StyledMessageInput = styled.div`
    background-color: white;
    padding: 1rem;
`;

const StyledInputBox = styled(InputBase)`
    width: 100%;
    border: ${APPLE_BIGSUR_GRAY_OUTLINE} solid 1px;
    border-radius: 15px;
    padding: 5px 0 0 0;
    // TODO: make the font size with that of the search bar.

    textarea {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

type TextChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
    key: string;
    shiftKey: boolean;
};

const MessageInput = ({ handle, service }: MessageComposeViewProps) => {
    const [text, setText] = useState("");

    useEffect(() => {
        // TODO remember draft message when switching tabs
        setText("");
    }, [handle]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const castedEvent = e as TextChangeEvent;
        if (castedEvent.key === ENTER_KEY && !castedEvent.shiftKey) {
            return;
        }
        setText(castedEvent.target.value);
    };

    function handleSend(e: React.KeyboardEvent<HTMLDivElement>) {
        // Clicking send doesn't have a key but pressing enter does
        if ((e.key && e.key !== "Enter") || e.shiftKey) {
            return;
        }

        e.preventDefault();

        sendMessage({
            content: {
                text,
            },
            handle,
            service,
        });

        setText("");
    }

    return (
        <StyledMessageInput>
            <StyledInputBox
                className="textInput"
                placeholder="Message"
                onKeyPress={handleSend}
                onChange={handleTextChange}
                value={text}
                multiline
            />
        </StyledMessageInput>
    );
};

export default MessageInput;
