import styled from "styled-components";
import cls from "classnames";

import TextInfo from "component/preview/card/TextInfo";
import Initials from "component/preview/card/Initials";
import Transcript from "typedef/Transcript";

import "style/PreviewCard.scss";
import { BlueCircle, GrayCircle } from "component/common/Circle";
import { VerticallyAlignedDiv } from "component/common/AlignedDiv";
import { useDispatch, useSelector } from "react-redux";
import { isSelectedAlias, selectAlias } from "redux/transcript/slice";

export type TranscriptWithAlias = Transcript & { alias: string };

type TranscriptPreviewProps = {
    transcript: TranscriptWithAlias;
};

type UnreadIndicatorProps = { isEnabled: boolean; isSelected: boolean };

const StyledUnreadIndicator = styled(VerticallyAlignedDiv)`
    min-width: 15px;
    width: 15px;
`;

const UnreadIndicator = ({ isEnabled, isSelected }: UnreadIndicatorProps) => {
    const circle = isSelected ? <GrayCircle /> : <BlueCircle />;
    return <StyledUnreadIndicator>{isEnabled && circle}</StyledUnreadIndicator>;
};

const PreviewCard = ({ transcript }: TranscriptPreviewProps) => {
    const dispatch = useDispatch();
    const isSelected = useSelector(isSelectedAlias(transcript.alias));

    const clsCard = cls("preview-card", { "is-selected": isSelected });
    const onClick = () => dispatch(selectAlias(transcript.alias));

    return (
        <div className={clsCard} onClick={onClick}>
            <UnreadIndicator isEnabled={transcript.unreadMessageCount > 0} isSelected={isSelected} />
            <Initials alias={transcript.alias} />
            <TextInfo alias={transcript.alias} lastMessage={transcript.lastMessage} />
        </div>
    );
};

export default PreviewCard;
