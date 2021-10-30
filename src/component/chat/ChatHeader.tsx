import Spacer from "component/common/FlexSpacer";
import { BOX_SHADOW_COLOR } from "style/const";
import styled from "styled-components";

import infoIcon from "asset/info.svg";

const StyledHeader = styled.div`
    font-weight: 200;
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

type TitleBarProps = {
    name: string;
};

const InfoIcon = styled.img`
    width: 18px;
    height: 18px;
`;

const ChatHeader = ({ name }: TitleBarProps) => {
    return (
        <StyledHeader>
            <span>To:</span>
            <PersonName>{name}</PersonName>
            <Spacer />
            <InfoIcon src={infoIcon} />
        </StyledHeader>
    );
};

export default ChatHeader;
