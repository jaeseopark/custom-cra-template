import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { InputBase } from "@mui/material";

import { sendMessage } from "redux/mdlwr";
import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";

const ENTER_KEY = "Enter";

type MessageComposeViewProps = {
    phoneOrEmail: string;
};

const StylizedMessageInput = styled.div`
    background-color: white;
    padding: 1rem;
`;

const StylizedInputBox = styled(InputBase)`
    width: 100%;
    font-size: 1rem;
    border: ${APPLE_BIGSUR_GRAY_OUTLINE} solid 1px;
    border-radius: 15px;
    padding: 5px 0 0 0;
    // TODO: make the font size with that of the search bar.
`;

const MessageInput = ({ phoneOrEmail }: MessageComposeViewProps) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        // TODO remember draft message when switching tabs
        setText("");
    }, [phoneOrEmail]);

    function handleTextChange(e: React.ChangeEventHandler) {
        // @ts-ignore
        if (e.key === ENTER_KEY && !e.shiftKey) {
            return;
        }
        // @ts-ignore
        setText(e.target.value);
    }

    // @ts-ignore
    function handleSend(e) {
        // Clicking send doesn't have a key but pressing enter does
        if ((e.key && e.key !== "Enter") || e.shiftKey) {
            return;
        }

        e.preventDefault();

        dispatch(
            sendMessage({
                id: uuidv4().toString(),
                content: {
                    text,
                },
                phoneOrEmail,
                timestamp: Date.now(),
                status: "sending",
            })
        );

        setText("");
    }

    return (
        <StylizedMessageInput>
            <StylizedInputBox
                className="textInput"
                placeholder="Message"
                onKeyPress={handleSend}
                // @ts-ignore
                onChange={handleTextChange}
                value={text}
                // minRows={4}
                multiline
            />
        </StylizedMessageInput>
    );
};

export default MessageInput;
