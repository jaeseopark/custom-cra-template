import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ContactContainer from "./ContactContainer";

const serverInfo = {
	host: process.env.REACT_APP_SERVER_HOST,
	port: process.env.REACT_APP_SERVER_PORT
};

const getWs = () => {
	const { host, port } = serverInfo;
	const url = `ws://${host}:${port}/msg`;
	return new WebSocket(url);
};

const getContacts = () => {
	const { host, port } = serverInfo;
	const url = `http://${host}:${port}/contacts`;
	console.log(url);
	return fetch(url).then(res => res.json());
};

const ChatContainer = () => {
	const [ws, setWs] = useState(getWs());
	const [contacts, setContacts] = useState({});

	useEffect(() => {
		getContacts().then(res => {
			console.log(res);
			setContacts(res);
		})
	}, []);

	useEffect(() => {
		ws.onopen = () => {
			console.log('WebSocket Connected');
		}

		ws.onclose = () => {
			console.log('WebSocket Disconnected');
			setWs(null);
		}
	}, [ws]);

	function getContactContainers() {
		const contactContainers = Object.keys(contacts).map((contact, index) => {
			const divider = index < contacts.length - 1 ? <Divider /> : null;
			const phoneNumber = contacts[contact];

			const sendMessage = (message) => {
				const payload = {
					message,
					recipient: phoneNumber,
				}
				ws.send(JSON.stringify(payload));
			};

			return (
				<React.Fragment key={index}>
					<ContactContainer contactName={contact} sendMessage={sendMessage} />
					{divider}
				</React.Fragment>
			);
		});

		return contactContainers;
	}

	if (contacts.length === 0) return null;

	const onlineLabel = ws ? "You are online" : "You are offline";

	return (
		<div className="chatContainer">
			<span>{onlineLabel}</span>
			<List component="nav" aria-label="mailbox folders" className="list">
				{getContactContainers()}
			</List>
		</div>
	);
};

export default ChatContainer;
