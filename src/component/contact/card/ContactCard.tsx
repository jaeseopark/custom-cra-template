import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectTranscript } from "redux/transcript/slice";
import TextInfo from "component/contact/card/TextInfo";
import Initials from "component/contact/card/Initials";

type TranscriptPreviewProps = {
    name: string;
    isSelected: boolean;
    onClickName: (n: string) => void;
};

const StylizedContactCard = styled.div`
    ${(props: { isSelected: boolean }) => {
        const { isSelected } = props;
        if (isSelected) {
            return `
                background-color: rgb(30, 114, 228);
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

const ContactCard = ({ name, isSelected, onClickName }: TranscriptPreviewProps) => {
    const transcript = useSelector(selectTranscript(name));
    const lastMessage = useMemo(() => {
        if (!transcript) return;
        if (transcript.messages.length) {
            return transcript.messages[transcript.messages.length - 1];
        }
    }, [transcript]);

    const onClick = () => {
        onClickName(name);
    };

    return (
        <StylizedContactCard isSelected={isSelected} onClick={onClick}>
            <UnreadIndicator />
            <Initials name={name} />
            <TextInfo name={name} lastMessage={lastMessage} />
        </StylizedContactCard>
    );
};

export default ContactCard;
