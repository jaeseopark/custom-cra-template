import { APPLE_BIGSUR_BLUE, APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";
import styled from "styled-components";

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 4px 12px;
    border: none;
    border-radius: 20px;
    background-color: ${APPLE_BIGSUR_BLUE};
    color: white;
    cursor: pointer;

    :disabled {
        background-color: ${APPLE_BIGSUR_GRAY_OUTLINE};
        cursor: default;
    }
`;

export const InvertedStyledButton = styled(StyledButton)`
    background-color: transparent;
    color: ${APPLE_BIGSUR_BLUE};

    :disabled {
        color: white;
    }
`;

export default StyledButton;
