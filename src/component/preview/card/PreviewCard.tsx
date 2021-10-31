import styled from "styled-components";
import cls from "classnames";

import TextInfo from "component/preview/card/TextInfo";
import Initials from "component/preview/card/Initials";
import Transcript from "typedef/Transcript";

import "style/PreviewCard.scss";
import { BlueCircle, GrayCircle } from "component/common/Circle";
import { VerticallyAlignedDiv } from "component/common/AlignedDiv";

type TranscriptPreviewProps = {
    alias: string;
    transcript: Transcript;
    isSelected: boolean;
    onClickAlias: (n: string) => void;
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

const PreviewCard = ({ alias, transcript, isSelected, onClickAlias }: TranscriptPreviewProps) => {
    const clsCard = cls("preview-card", { "is-selected": isSelected });
    const onClick = () => onClickAlias(alias);

    return (
        <div className={clsCard} onClick={onClick}>
            <UnreadIndicator isEnabled={transcript.unreadMessageCount > 0} isSelected={isSelected} />
            <Initials alias={alias} />
            <TextInfo alias={alias} lastMessage={transcript.lastMessage} />
        </div>
    );
};

export default PreviewCard;
