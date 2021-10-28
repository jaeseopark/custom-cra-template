import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "component/common/AlignedDiv";
import styled from "styled-components";

type InitialsProps = {
    alias: string;
};

const HorizontallyAlignedIcon = styled(HorizontallyAlignedDiv)`
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: gainsboro;
    font-size: x-large;
    font-weight: 500;
    display: flex;
`;

const getInitials = (alias: string) =>
    alias
        .split(" ")
        .map((word) => word.substr(0, 1).toUpperCase())
        .join("");

const Initials = ({ alias }: InitialsProps) => (
    <HorizontallyAlignedIcon>
        <VerticallyAlignedDiv>{getInitials(alias)}</VerticallyAlignedDiv>
    </HorizontallyAlignedIcon>
);

export default Initials;
