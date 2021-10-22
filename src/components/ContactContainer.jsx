import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

const TIMESTAMP_CLEAR = 1500;

const ENTER_KEY = "Enter";

const ContactContainer = (props) => {
	const { contactName } = props;

	const [text, setText] = useState("");
	const [lastSuccessfulSend, setLastSuccessfulSend] = useState();

	function handleTextChange(e) {
		if (e.key === ENTER_KEY && !e.shiftKey) {
			return;
		}
		setText(e.target.value);
	}

	function handleSend(e) {
		// Clicking send doesn't have a key but pressing enter does
		if ((e.key && e.key !== "Enter") || e.shiftKey) {
			return;
		}

		e.preventDefault();

		const dateAndTime = dayjs().format("h:mm");

		// Insert api call here
		setText("");
		setLastSuccessfulSend(dateAndTime);

		setTimeout(() => {
			setLastSuccessfulSend(undefined);
		}, TIMESTAMP_CLEAR);
	}

	const timestampString = `Sent at ${lastSuccessfulSend}`;

	return (
		<ListItem className="contactContainer">
			<ListItemText primary={contactName} inset />
			<Paper className="textContainer">
				<InputBase
					className="textInput"
					placeholder="Type your message"
					onKeyPress={handleSend}
					onChange={handleTextChange}
					value={text}
					minRows={4}
					multiline
				/>
				{lastSuccessfulSend && (
					<p className="timeStamp">{timestampString}</p>
				)}
				<IconButton type="submit" onClick={handleSend}>
					<SendIcon />
				</IconButton>
			</Paper>
		</ListItem>
	);
};

export default ContactContainer;
