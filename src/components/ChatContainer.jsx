import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ContactContainer from "./ContactContainer";

const ChatContainer = () => {
	// Populate this with your GET contacts service call
	const contacts = ["Nathan", "Jacky", "Jaeseo"];

	function getContactContainers() {
		const contactContainers = contacts.map((contact, index) => {
			const divider = index < contacts.length - 1 ? <Divider /> : null;

			return (
				<React.Fragment key={index}>
					<ContactContainer contactName={contact} />
					{divider}
				</React.Fragment>
			);
		});

		return contactContainers;
	}

	return (
		<div className="chatContainer">
			<List component="nav" aria-label="mailbox folders" className="list">
				{getContactContainers()}
			</List>
		</div>
	);
};

export default ChatContainer;
