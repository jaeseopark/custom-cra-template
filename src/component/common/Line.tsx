import styled from "styled-components";

import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";

const Line = styled.div`
    background-color: ${APPLE_BIGSUR_GRAY_OUTLINE};
`;

export const VerticalLine = styled(Line)`
    width: 1px;
`;

export const HorizontalLine = styled(Line)`
    height: 1px;
`;
