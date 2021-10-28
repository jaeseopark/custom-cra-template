import styled from "styled-components";

import IMFMessage from "typedef/IMFMessage";
import { getHumanTime } from "util/datetime";
import Snippet from "component/preview/card/Snippet";

type TextInfoProps = {
    alias: string;
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

const TextInfo = ({ alias, lastMessage }: TextInfoProps) => (
    <StylizedTextInfo>
        <Header>
            <span>{alias}</span>
            <Spacer />
            <span>{getHumanTime(lastMessage?.timestamp)}</span>
        </Header>
        <Snippet lastMessage={lastMessage} />
    </StylizedTextInfo>
);

export default TextInfo;
