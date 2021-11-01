import { useEffect, useState } from "react";

const SEP = "-";
const MANAGE_PRESET = "Manage Preset";

type ErrorMessage = string;

type PresetDropdownProps = {
    presetId: string;
    defaultPreset: string[]; // some default options. will be used to initialize user's local storage.
    onChange: (value: string) => void;
    value?: string;
    secondaryPreset?: string[]; // default presets that should not be saved to localStorage
    validateLine?: (line: string) => ErrorMessage | null | undefined;
};

const PresetDropdown = ({
    presetId,
    defaultPreset,
    onChange,
    value,
    secondaryPreset,
    validateLine,
}: PresetDropdownProps) => {
    const [preset, setPreset] = useState("");

    useEffect(() => {
        // TODO: localStorage[presetDropdown][presetId]
    }, []);

    const innerOnChange = ({ target: { value } }: any) => {
        // TODO: use onChange here
        console.log(value);

        if (value === MANAGE_PRESET) {
            // TODO: open preset edit window
            // use validateLine
            return;
        }

        console.log("callback");
        onChange(value);
    };

    const getUniqueLines = () =>
        Array.from(
            new Set(
                preset
                    .split("\n")
                    .concat(defaultPreset)
                    .concat(secondaryPreset || [])
                    .map((line) => line.trim())
                    .filter((line) => line)
            )
        );

    if (!preset && defaultPreset.length === 0) return null;

    const options = getUniqueLines().map((line) => <option key={line}>{line}</option>);

    return (
        <select value={value} onChange={innerOnChange}>
            {options}
            <option key={SEP} disabled>
                {SEP}
            </option>
            <option key={MANAGE_PRESET}>{MANAGE_PRESET}</option>
        </select>
    );
};

export default PresetDropdown;
