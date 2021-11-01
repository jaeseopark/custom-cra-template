import styled from "styled-components";
import { APPLE_BIGSUR_GRAY_BACKGROUND, BOX_SHADOW_COLOR } from "style/const";

const ShadowedShell = styled.div`
    overflow: hidden;
    border: none;
    border-radius: 12px;
    box-shadow: 0px 10px 35px ${BOX_SHADOW_COLOR};
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
`;

export default ShadowedShell;
