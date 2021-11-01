import { APPLE_BIGSUR_BLUE, APPLE_BIGSUR_BLUE_OUTLINE } from "style/const";
import styled from "styled-components";

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 4px 12px;
    border: solid 1px;
    border-radius: 20px;
    border-color: ${APPLE_BIGSUR_BLUE_OUTLINE};
    background-color: ${APPLE_BIGSUR_BLUE};
    color: white;
    cursor: pointer;
`;

export default StyledButton;
