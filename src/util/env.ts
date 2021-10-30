export const getEnvAsNumber = (key: string): number => parseInt(process.env[key]!);

export const getEnvAsNumberOrDefault = (key: string, defaultValue: number) => {
    const val = process.env[key];
    if (val) {
        return parseInt(val);
    }
    return defaultValue;
};
