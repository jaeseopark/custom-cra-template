import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "component/common/AlignedDiv";
import styled from "styled-components";

type InitialsProps = {
    name: string;
};

// TODO center align

const HorizontallyAlignedIcon = styled(HorizontallyAlignedDiv)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: gainsboro;
    font-size: x-large;
    font-weight: 500;
    display: flex;
`;

const getPersonInitials = (name: string) =>
    name
        .split(" ")
        .map((word) => word.substr(0, 1).toUpperCase())
        .join("");

const Initials = ({ name }: InitialsProps) => (
    <HorizontallyAlignedIcon>
        <VerticallyAlignedDiv>{getPersonInitials(name)}</VerticallyAlignedDiv>
    </HorizontallyAlignedIcon>
);

export default Initials;
