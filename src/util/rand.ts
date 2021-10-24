import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const HUMAN_CONFIG: Config = {
    dictionaries: [names],
};

export const getHuman = () => uniqueNamesGenerator(HUMAN_CONFIG);
