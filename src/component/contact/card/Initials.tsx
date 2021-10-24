import styled from "styled-components";

type InitialsProps = {
    name: string;
};

// TODO center align

const Icon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: gainsboro;
    font-size: x-large;
    font-weight: 500;
`;

const getPersonInitials = (name: string) =>
    name.split(" ").map((word) => word.substr(0, 1).toUpperCase()).join("");

const Initials = ({ name }: InitialsProps) => <Icon>{getPersonInitials(name)}</Icon>;

export default Initials;
