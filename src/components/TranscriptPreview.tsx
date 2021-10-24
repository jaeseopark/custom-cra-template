import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectTranscript } from "redux/transcript/slice";

const StylizedTranscriptPreview = styled.div`
    ${(props: { isSelcted: boolean }) => {
        const { isSelcted } = props;
        if (isSelcted) {
            return "background-color: blue;";
        }
        return null;
    }}
`;

const PersonIcon = styled.div``;

const getPersonInitials = (name: string) => name.split(" ").map((word) => word.substr(0, 1).toUpperCase());

type TranscriptPreviewProps = {
    name: string;
    isSelcted: boolean;
    onClickName: (n: string) => void;
};

const TranscriptPreview = ({ name, isSelcted, onClickName }: TranscriptPreviewProps) => {
    const transcript = useSelector(selectTranscript(name));
    const lastMessage = useMemo(() => {
        if (!transcript) return null;
        if (transcript.messages.length) {
            return transcript.messages[transcript.messages.length - 1];
        }
        return null;
    }, [transcript]);

    const onClick = () => {
        onClickName(name);
    };

    return (
        <StylizedTranscriptPreview isSelcted={isSelcted} onClick={onClick}>
            <PersonIcon>{getPersonInitials(name)}</PersonIcon>
            <div>{name}</div>
            <div className="lastMessage">
                <div className="snippet">{lastMessage?.content.text}</div>
                <div className="timestamp">{lastMessage?.timestamp}</div>
            </div>
        </StylizedTranscriptPreview>
    );
};

export default TranscriptPreview;
