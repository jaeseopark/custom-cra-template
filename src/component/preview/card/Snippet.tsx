import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";

type SnippetProps = {
    lastMessage?: IMFMessage;
};

const StyledSnippet = styled.div``;

// TODO: check for attachments
// TODO: trunacte the message
const Snippet = ({ lastMessage }: SnippetProps) => <StyledSnippet>{lastMessage?.content.text}</StyledSnippet>;

export default Snippet;
