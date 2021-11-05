import styled from "styled-components";
import { IMFMessageContent } from "typedef/IMFMessage";

const StyledSpan = styled.span`
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// TODO: check for attachments
const Snippet = ({ text, attachments }: IMFMessageContent) => {
    if (attachments) return <span>Attachment</span>;
    return <StyledSpan>{text}</StyledSpan>;
};
export default Snippet;
