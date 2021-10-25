import { useSelector } from "react-redux";
import { selectNames } from "redux/transcript/slice";
import styled from "styled-components";
import ContactCard from "component/contact/card/ContactCard";
import { APPLE_BIGSUR_GRAY_BACKGROUND } from "style/const";

const StylizedContactContainer = styled.div`
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    overflow-y: scroll;
    overflow-x: hidden;
`;

type ContactCardContainerProps = {
    onClickName: (n: string) => void;
    selectedName?: string;
};

const ContactCardContainer = ({ onClickName, selectedName }: ContactCardContainerProps) => {
    const names = useSelector(selectNames);

    const getContactCards = () =>
        names.map((name) => (
            <ContactCard
                key={name}
                name={name}
                isSelected={selectedName === name}
                onClickName={onClickName}
            />
        ));

    return <StylizedContactContainer>{getContactCards()}</StylizedContactContainer>;
};

export default ContactCardContainer;
