import styled from "styled-components";

const StylizedHeader = styled.div`
    height: 50px;
    font-weight: 200;
`;

const PersonName = styled.span`
    margin-left: 5px;
    font-weight: 600;
`;

type TitleBarProps = {
    name: string;
};

const ChatHeader = ({ name }: TitleBarProps) => {
    return (
        <StylizedHeader>
            <span>To:</span>
            <PersonName>{name}</PersonName>
        </StylizedHeader>
    );
};

export default ChatHeader;
