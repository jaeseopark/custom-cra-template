import { useSelector } from "react-redux";
import { selectNames, selectTranscripts } from "redux/transcript/slice";
import styled from "styled-components";
import ContactCard from "component/contact/card/ContactCard";
import { APPLE_BIGSUR_GRAY_BACKGROUND } from "style/const";
import { compareChronologically } from "util/transcripts";
import Transcript from "typedef/Transcript";

const StylizedContactContainer = styled.div`
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    overflow-y: scroll;
    overflow-x: hidden;
`;

export type ContactCardContainerProps = {
    onClickAlias: (n: string) => void;
    selectedAlias?: string;
};

type ATCompound = {
    alias: string;
    transcript: Transcript;
};

const ContactCardContainer = ({ onClickAlias, selectedAlias }: ContactCardContainerProps) => {
    const aliases = useSelector(selectNames);
    const transcripts = useSelector(selectTranscripts);

    const toATCompound = (alias: string): ATCompound => ({
        alias,
        transcript: transcripts[alias],
    });

    const reverseSort = (o1: ATCompound, o2: ATCompound) =>
        -1 * compareChronologically(o1.transcript, o2.transcript);

    return (
        <StylizedContactContainer>
            {aliases
                .map(toATCompound)
                .sort(reverseSort)
                .map(({ alias, transcript }) => (
                    <ContactCard
                        key={alias}
                        transcript={transcript}
                        alias={alias}
                        isSelected={selectedAlias === alias}
                        onClickAlias={onClickAlias}
                    />
                ))}
        </StylizedContactContainer>
    );
};

export default ContactCardContainer;
