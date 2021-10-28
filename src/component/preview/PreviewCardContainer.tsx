import { useSelector } from "react-redux";
import { selectNames, selectTranscripts } from "redux/transcript/slice";
import styled from "styled-components";
import PreviewCard from "component/preview/card/PreviewCard";
import { APPLE_BIGSUR_GRAY_BACKGROUND } from "style/const";
import { compareChronologically } from "util/transcripts";
import Transcript from "typedef/Transcript";

const StylizedPreviewContainer = styled.div`
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    overflow-y: scroll;
    overflow-x: hidden;
`;

export type PreviewCardContainerProps = {
    onClickAlias: (n: string) => void;
    selectedAlias?: string;
};

type ATCompound = {
    alias: string;
    transcript: Transcript;
};

const PreviewCardContainer = ({ onClickAlias, selectedAlias }: PreviewCardContainerProps) => {
    const aliases = useSelector(selectNames);
    const transcripts = useSelector(selectTranscripts);

    const toATCompound = (alias: string): ATCompound => ({
        alias,
        transcript: transcripts[alias],
    });

    const reverseSort = (o1: ATCompound, o2: ATCompound) =>
        -1 * compareChronologically(o1.transcript, o2.transcript);

    return (
        <StylizedPreviewContainer>
            {aliases
                .map(toATCompound)
                .sort(reverseSort)
                .map(({ alias, transcript }) => (
                    <PreviewCard
                        key={alias}
                        transcript={transcript}
                        alias={alias}
                        isSelected={selectedAlias === alias}
                        onClickAlias={onClickAlias}
                    />
                ))}
        </StylizedPreviewContainer>
    );
};

export default PreviewCardContainer;
