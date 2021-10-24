import dayjs from "dayjs";
import styled from "styled-components";
import IMFMessage from "typedef/IMFMessage";
import Snippet from "./Snippet";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;

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

const Spacer = styled.div`
    flex-grow: 1;
`;

const Timestamp = styled.span``;

const getHumanTime = (timestamp?: number) => {
    if (!timestamp) return null;

    if (Date.now() - timestamp < DAY_IN_MS) {
        return dayjs(timestamp).format("h:mm A");
    }

    if (Date.now() - timestamp < WEEK_IN_MS) {
        return dayjs(timestamp).format("dddd");
    }

    return dayjs(timestamp).format("MMM. D");
};

const TextInfo = ({ name, lastMessage }: TextInfoProps) => (
    <StylizedTextInfo>
        <Header>
            <span>{name}</span>
            <Spacer />
            <Timestamp>{getHumanTime(lastMessage?.timestamp)}</Timestamp>
        </Header>
        <Snippet lastMessage={lastMessage} />
    </StylizedTextInfo>
);

export default TextInfo;
