import styled from "styled-components";

export const VerticallyAlignedDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const HorizontallyAlignedDiv = styled(VerticallyAlignedDiv)`
    flex-direction: row;
`;
