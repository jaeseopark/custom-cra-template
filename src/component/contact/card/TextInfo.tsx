import dayjs from "dayjs";
import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";

type TextInfoProps = {
    name: string;
    lastMessage?: IMFMessage;
};

const StylizedTextInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    margin-left: 5px;
`;

const Header = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const Snippet = styled.div``;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Timestamp = styled.span``;

const getHumanTime = (timestamp?: number) => {
    if (!timestamp) return null;
    return dayjs(timestamp).format("h:mm A");
};

const TextInfo = ({ name, lastMessage }: TextInfoProps) => (
    <StylizedTextInfo>
        <Header>
            <span>{name}</span>
            <Spacer />
            <Timestamp>{getHumanTime(lastMessage?.timestamp)}</Timestamp>
        </Header>
        <Snippet>{lastMessage?.content.text}</Snippet>
    </StylizedTextInfo>
);

export default TextInfo;
