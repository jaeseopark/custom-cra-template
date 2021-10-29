import {
    APPLE_BIGSUR_BLUE,
    APPLE_BIGSUR_BLUE_OUTLINE,
    APPLE_BIGSUR_GRAY_BACKGROUND,
    APPLE_BIGSUR_GRAY_OUTLINE,
    APPLE_BIGSUR_GREEN,
    APPLE_BIGSUR_GREEN_OUTLINE,
    APPLE_BIGSUR_RED,
    APPLE_BIGSUR_RED_OUTLINE,
} from "style/const";
import styled from "styled-components";

export const Circle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 100px;
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    border: solid 0.75px ${APPLE_BIGSUR_GRAY_OUTLINE};
`;

export const GreenCircle = styled(Circle)`
    background-color: ${APPLE_BIGSUR_GREEN};
    border-color: ${APPLE_BIGSUR_GREEN_OUTLINE};
`;

export const RedCircle = styled(Circle)`
    background-color: ${APPLE_BIGSUR_RED};
    border-color: ${APPLE_BIGSUR_RED_OUTLINE};
`;

export const BlueCircle = styled(Circle)`
    background-color: ${APPLE_BIGSUR_BLUE};
    border-color: ${APPLE_BIGSUR_BLUE_OUTLINE};
`;