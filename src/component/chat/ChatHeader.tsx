import Spacer from "component/common/FlexSpacer";
import { BOX_SHADOW_COLOR } from "style/const";
import styled from "styled-components";

const StylizedHeader = styled.div`
    font-weight: 200;
    font-size: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-flow: row nowrap;
    box-shadow: 0 5px 10px -10px ${BOX_SHADOW_COLOR};
    position: relative; // this makes the box-shawdow appear over TranscriptView.
`;

const PersonName = styled.span`
    margin-left: 5px;
    font-weight: 600;
`;

const InfoIcon = styled.span`
    border-radius: 100%;
    width: 15px;
    height: 15px;
    border: gray 1.5px solid;
    color: gray;
    font-family: monospace;
    // TODO: text align and circle size
    // maybe just slap a SVG...
`;

type TitleBarProps = {
    name: string;
};

const ChatHeader = ({ name }: TitleBarProps) => {
    return (
        <StylizedHeader>
            <span>To:</span>
            <PersonName>{name}</PersonName>
            <Spacer />
            <InfoIcon>i</InfoIcon>
        </StylizedHeader>
    );
};

export default ChatHeader;
