import styled from "styled-components";

const StylizedTitleBar = styled.div`
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

const TitleBar = ({ name }: TitleBarProps) => {
    return (
        <StylizedTitleBar>
            <span>To:</span>
            <PersonName>{name}</PersonName>
        </StylizedTitleBar>
    );
};

export default TitleBar;
