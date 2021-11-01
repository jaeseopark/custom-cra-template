import { useEffect, useState } from "react";

const MANAGE_PRESET = "Manage Preset";

type PresetDropdownProps = {
    presetId: string;
    defaultPreset: string[]; // some default options. will be used to initialize user's local storage.
    onChange: (value: string) => void;
    value?: string;
    secondaryPreset?: string[]; // default presets that should not be saved to localStorage
};

const PresetDropdown = ({ presetId, defaultPreset, onChange, value, secondaryPreset }: PresetDropdownProps) => {
    const [preset, setPreset] = useState("");

    useEffect(() => {
        // TODO: localStorage[presetDropdown][presetId]
    }, []);

    const innerOnChange = ({ target: { value } }: any) => {
        // TODO: use onChange here
        console.log(value);

        if (value === MANAGE_PRESET) {
            return;
        }

        console.log("callback");
        onChange(value);
    };

    const getUniqueLines = () => {
        const set = new Set(
            preset
                .split("\n")
                .concat(defaultPreset)
                .concat(secondaryPreset || [])
                .map((line) => line.trim())
                .filter((line) => line)
        );
        set.add(MANAGE_PRESET);
        return Array.from(set);
    };

    if (!preset && defaultPreset.length === 0) return null;

    const options = getUniqueLines().map((line) => <option key={line}>{line}</option>);

    return (
        <select value={value} onChange={innerOnChange}>
            {options}
        </select>
    );
};

export default PresetDropdown;
