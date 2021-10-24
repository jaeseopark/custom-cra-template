import Transcript from "typedef/Transcript";
import MessageView from "./MessageView";

type TranscriptViewProps = {
    transcript: Transcript;
};

const TranscriptView = ({ transcript }: TranscriptViewProps) => {
    // TODO: timestamp logic

    return (
        <div className="transcript">
            {transcript.messages.map((msg) => (
                <MessageView key={msg.id} message={msg} />
            ))}
        </div>
    );
};

export default TranscriptView;
