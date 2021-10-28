import IMFMessage from "typedef/IMFMessage";

type SnippetProps = {
    lastMessage?: IMFMessage;
};

// TODO: check for attachments
const Snippet = ({ lastMessage }: SnippetProps) => <div>{lastMessage?.content.text}</div>;

export default Snippet;
