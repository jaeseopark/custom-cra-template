import styled from "styled-components";

import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";
import PreviewCardContainer from "./preview/PreviewCardContainer";
import Search from "./Search";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import { selectTranscripts } from "redux/transcript/slice";
import { useMemo, useState } from "react";

const StyledSidebar = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 350px;
    padding: 0 10px 0 10px;
    border-right: 1px solid ${APPLE_BIGSUR_GRAY_OUTLINE};
    /* resize: horizontal; */
`;

const Sidebar = () => {
    const transcripts = useSelector(selectTranscripts);
    const [searchKey, setSearchKey] = useState("");

    const processedTranscripts = useMemo(() => {
        return Object.keys(transcripts)
            .filter((alias) => alias.includes(searchKey))
            .map((alias) => ({ ...transcripts[alias], alias }));
    }, [searchKey, transcripts]);

    return (
        <StyledSidebar>
            <Settings />
            <Search updateSearchKey={setSearchKey} />
            <PreviewCardContainer transcripts={processedTranscripts} />
        </StyledSidebar>
    );
};

export default Sidebar;
