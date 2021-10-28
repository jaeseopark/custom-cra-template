import styled from "styled-components";

import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";

// TODO: find a better looking magnifier
import magnifierImgSrc from "asset/magnifier.svg";

const StylizedSearchBar = styled.div`
    margin-bottom: 1.5rem;
    border: solid 1px ${APPLE_BIGSUR_GRAY_OUTLINE};
    display: flex;
    padding: 5px;
    border-radius: 5px;
`;

const MagnifierIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const Input = styled.input`
    border: none;
    background-color: unset;
    outline: none;
    flex-grow: 1;
    margin-left: 3px;
`;

const SearchBar = () => (
    <StylizedSearchBar>
        <MagnifierIcon src={magnifierImgSrc} />
        <Input type="text" placeholder="Search" />
    </StylizedSearchBar>
);

export default SearchBar;
