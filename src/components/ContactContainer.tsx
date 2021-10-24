import { useSelector } from "react-redux";
import { selectNames } from "redux/transcript/slice";
import styled from "styled-components";
import TranscriptPreview from "./TranscriptPreview";

const StylizedContactContainer = styled.div`
    background-color: gainsboro;
    width: 350px;
`;

type ContactContainerProps = {
    onClickName: (n: string) => void;
    selectedName?: string;
};

const ContactContainer = ({ onClickName, selectedName }: ContactContainerProps) => {
    const names = useSelector(selectNames);

    return (
        <StylizedContactContainer>
            {names.map((name) => {
                const isSelected = selectedName === name;
                return <TranscriptPreview key={name} name={name} isSelcted={isSelected} onClickName={onClickName} />;
            })}
        </StylizedContactContainer>
    );
};

export default ContactContainer;
