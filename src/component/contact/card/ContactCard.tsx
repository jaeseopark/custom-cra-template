import { useMemo } from "react";
import styled from "styled-components";

import TextInfo from "component/contact/card/TextInfo";
import Initials from "component/contact/card/Initials";
import { APPLE_BIGSUR_BLUE } from "style/const";
import Transcript from "typedef/Transcript";

type TranscriptPreviewProps = {
    alias: string;
    transcript: Transcript;
    isSelected: boolean;
    onClickAlias: (n: string) => void;
};

const StylizedContactCard = styled.div`
    ${(props: { isSelected: boolean }) => {
        const { isSelected } = props;
        if (isSelected) {
            return `
                background-color: ${APPLE_BIGSUR_BLUE};
                color: white;
            `;
        }
        return null;
    }}

    border-radius: 10px;
    display: flex;
    padding: 5px;
`;

const UnreadIndicator = styled.div``;

const ContactCard = ({ alias, transcript, isSelected, onClickAlias: onClickName }: TranscriptPreviewProps) => {
    const lastMessage = useMemo(() => {
        if (!transcript) return;
        if (transcript.messages.length) {
            return transcript.messages[transcript.messages.length - 1];
        }
    }, [transcript]);

    const onClick = () => {
        onClickName(alias);
    };

    return (
        <StylizedContactCard isSelected={isSelected} onClick={onClick}>
            <UnreadIndicator />
            <Initials alias={alias} />
            <TextInfo alias={alias} lastMessage={lastMessage} />
        </StylizedContactCard>
    );
};

export default ContactCard;
