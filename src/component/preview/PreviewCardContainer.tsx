import { useSelector } from "react-redux";
import { selectNames, selectTranscripts } from "redux/transcript/slice";
import styled from "styled-components";
import PreviewCard from "component/preview/card/PreviewCard";
import { APPLE_BIGSUR_GRAY_BACKGROUND } from "style/const";
import { compareChronologically } from "util/transcripts";
import Transcript from "typedef/Transcript";

const StyledPreviewContainer = styled.div`
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    overflow-y: scroll;
    overflow-x: hidden;
`;

type PreviewCardContainerProps = {
    onClickAlias: (n: string) => void;
    selectedAlias?: string;
};

type Compound = {
    alias: string;
    transcript: Transcript;
};

const newToOld = (c1: Compound, c2: Compound) => -1 * compareChronologically(c1.transcript, c2.transcript);

const PreviewCardContainer = ({ onClickAlias, selectedAlias }: PreviewCardContainerProps) => {
    const aliases = useSelector(selectNames);
    const transcripts = useSelector(selectTranscripts);

    const toCompound = (alias: string): Compound => ({
        alias,
        transcript: transcripts[alias],
    });

    const compounds = aliases.map(toCompound);

    return (
        <StyledPreviewContainer>
            {compounds.sort(newToOld).map((props) => {
                const { alias, transcript } = props;
                return (
                    <PreviewCard
                        key={alias}
                        transcript={transcript}
                        alias={alias}
                        isSelected={selectedAlias === alias}
                        onClickAlias={onClickAlias}
                    />
                );
            })}
        </StyledPreviewContainer>
    );
};

export default PreviewCardContainer;
