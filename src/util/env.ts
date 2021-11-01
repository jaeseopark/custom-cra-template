export const getEnvAsNumber = (key: string): number => parseInt(process.env[key]!);
