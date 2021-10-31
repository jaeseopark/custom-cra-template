import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";

type SnippetProps = {
    lastMessage?: IMFMessage;
};

const StyledSnippet = styled.div`
    height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// TODO: check for attachments
const Snippet = ({ lastMessage }: SnippetProps) => <StyledSnippet>{lastMessage?.content.text}</StyledSnippet>;

export default Snippet;
