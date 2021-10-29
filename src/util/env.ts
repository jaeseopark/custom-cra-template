export const getReactEnv = (varName: string) =>
    process.env[varName] || process.env[`REACT_APP_${varName}`];

export const getReactEnvOrDefault = (varName: string, defaultValue: string) =>
    getReactEnv(varName) || defaultValue;
