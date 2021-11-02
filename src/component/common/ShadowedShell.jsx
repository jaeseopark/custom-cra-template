import styled from "styled-components";
import { APPLE_BIGSUR_GRAY_BACKGROUND, LARGE_BOX_SHADOW } from "style/const";

const ShadowedShell = styled.div`
    overflow: hidden;
    border: none;
    border-radius: 12px;
    box-shadow: ${LARGE_BOX_SHADOW};
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
`;

export default ShadowedShell;
