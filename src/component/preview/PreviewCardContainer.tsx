import styled from "styled-components";
import PreviewCard, { TranscriptWithAlias } from "component/preview/card/PreviewCard";
import { APPLE_BIGSUR_GRAY_BACKGROUND } from "style/const";
import AutohideScroll from "component/common/AutohideScroll";

const StyledPreviewContainer = styled(AutohideScroll)`
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
`;

type PreviewCardContainerProps = {
    transcripts: TranscriptWithAlias[];
};

const newToOld = (t1: TranscriptWithAlias, t2: TranscriptWithAlias) =>
    -1 * ((t1.lastMessage?.id || 0) - (t2.lastMessage?.id || 0));

const PreviewCardContainer = ({ transcripts }: PreviewCardContainerProps) => (
    <StyledPreviewContainer>
        {transcripts.sort(newToOld).map((transcriptWithAlias) => {
            return <PreviewCard key={transcriptWithAlias.alias} transcript={transcriptWithAlias} />;
        })}
    </StyledPreviewContainer>
);

export default PreviewCardContainer;
