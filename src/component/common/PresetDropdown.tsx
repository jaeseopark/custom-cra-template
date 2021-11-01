import { useEffect, useState } from "react";
import PresetDropdownEditor, { Validate } from "./PresetDropdownEditor";

const SEP = "-";
const MANAGE_PRESET = "Manage Preset";

type PresetDropdownProps = {
    presetId: string;
    defaultPreset: string[]; // one or more default options. will be used to initialize user's local storage.
    onChange: (value: string) => void;
    value?: string;
    secondaryPreset?: string[]; // default presets that should not be saved to localStorage
    validate?: Validate;
};

const PresetDropdown = ({
    presetId,
    defaultPreset,
    onChange,
    value,
    secondaryPreset,
    validate,
}: PresetDropdownProps) => {
    const [preset, setPreset] = useState("");
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        let localPresetStorage: string = localStorage[`preset-${presetId}`];
        const lastUsed: string = localStorage[`preset-${presetId}-lastused`];

        if (!localPresetStorage) {
            localPresetStorage = defaultPreset.join("\n");
            localStorage[`preset-${presetId}`] = localPresetStorage;
        }

        setPreset(localPresetStorage);
        if (lastUsed) {
            onChange(lastUsed);
        }
    }, []);

    const innerOnChange = ({ target: { value } }: any) => {
        if (value === MANAGE_PRESET) {
            return setEditMode(true);
        }
        localStorage[`preset-${presetId}-lastused`] = value;
        onChange(value);
    };

    const onEditorSave = (preset: string) => {
        const [firstOption] = preset.split("\n");

        localStorage[`preset-${presetId}`] = preset;
        localStorage[`preset-${presetId}-lastused`] = firstOption;

        setPreset(preset);
        onChange(firstOption);
        setEditMode(false);
    };

    const onEditorCancel = () => setEditMode(false);

    const getUniqueLines = () =>
        Array.from(
            new Set(
                preset
                    .split("\n")
                    .concat(secondaryPreset || [])
                    .map((line) => line.trim())
                    .filter((line) => line)
            )
        );

    if (!preset && defaultPreset.length === 0) return null;

    const options = getUniqueLines().map((line) => <option key={line}>{line}</option>);

    return (
        <>
            <select value={value} onChange={innerOnChange}>
                {options}
                <option key={SEP} disabled>
                    {SEP}
                </option>
                <option key={MANAGE_PRESET}>{MANAGE_PRESET}</option>
            </select>
            <PresetDropdownEditor
                enabled={isEditMode}
                validate={validate}
                preset={preset}
                onSave={onEditorSave}
                onCancel={onEditorCancel}
            />
        </>
    );
};

export default PresetDropdown;
