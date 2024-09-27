import { EmojiData, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

type EmojiPickerProps = {
    onSelect: (emoji: string) => void;
    onCancel: () => void;
};

const EmojiPicker = ({ onSelect, onCancel }: EmojiPickerProps) => {
    const innerOnSelect = (e: EmojiData & { native: string }) => {
        onSelect(e.native);
    };

    return (
        <div>
            <Picker set="apple" onSelect={innerOnSelect} />
        </div>
    );
};

export default EmojiPicker;
