import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "redux/mdlwr";
import { v4 as uuidv4 } from "uuid";
import { IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ENTER_KEY = "Enter";

type MessageComposeViewProps = {
    phoneOrEmail: string;
};

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
        <Paper className="textContainer">
            <InputBase
                className="textInput"
                placeholder="Type your message"
                onKeyPress={handleSend}
                // @ts-ignore
                onChange={handleTextChange}
                value={text}
                minRows={4}
                multiline
            />
            <IconButton type="submit" onClick={handleSend}>
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default MessageInput;
