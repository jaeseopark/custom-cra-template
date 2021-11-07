import { useState } from "react";
import styled from "styled-components";

import { HorizontallyAlignedDiv } from "./AlignedDiv";
import Spacer from "./FlexSpacer";
import IMFModal from "./IMFModal";
import StyledButton from "./StyledButton";

type ErrorMessage = string;

export type Validate = (line: string) => ErrorMessage | null | undefined;

type PresetDropdownEditorProps = {
    preset: string;
    validate?: Validate;
    onSave: (newPreset: string) => void;
    onCancel: () => void;
};

const validateAll = (lines: string[], validate: Validate) => {
    const { errors } = lines.reduce(
        (acc, line) => {
            const { errors, i } = acc;
            const error = validate(line);
            if (error) {
                errors.push(`line ${i} ${error}`);
            }
            return { errors, i: i + 1 };
        },
        { errors: new Array<string>(), i: 0 }
    );
    return errors;
};

const TextArea = styled.textarea`
    min-width: 400px;
    min-height: 150px;
`;

const ErrorPre = styled.pre`
    color: red;
`;

const SpacedButton = styled(StyledButton)`
    margin-left: 5px;
`;

const Title = styled.h3``;

const PresetDropdownEditor = ({ preset, validate, onSave, onCancel }: PresetDropdownEditorProps) => {
    const [newPreset, setNewPreset] = useState(preset);
    const [errorMessage, setErrorMessage] = useState("");

    const innerOnSave = () => {
        const lines = newPreset.split("\n").filter((line) => line.trim());
        if (lines.length === 0) {
            return setErrorMessage("The preset cannot be blank");
        }

        if (validate) {
            const errors = validateAll(lines, validate);
            if (errors.length > 0) {
                return setErrorMessage(errors.join("\n"));
            }
        }

        onSave(lines.join("\n"));
    };

    return (
        <IMFModal>
            <Title>Edit Preset</Title>
            <TextArea onChange={({ target: { value } }) => setNewPreset(value)}>{newPreset}</TextArea>
            <div>
                <ErrorPre>{errorMessage}</ErrorPre>
            </div>
            <HorizontallyAlignedDiv>
                <Spacer />
                <SpacedButton onClick={onCancel}>Cancel</SpacedButton>
                <SpacedButton onClick={innerOnSave}>Save</SpacedButton>
            </HorizontallyAlignedDiv>
        </IMFModal>
    );
};

const PresetDropdownEditorWrapper = ({ enabled, ...props }: PresetDropdownEditorProps & { enabled: boolean }) => {
    if (!enabled) return null;
    return <PresetDropdownEditor {...props} />;
};

export default PresetDropdownEditorWrapper;
