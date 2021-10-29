import dayjs from "dayjs";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;

const SHORT_TERM_FORMAT = process.env.REACT_APP_IMF_TIME_FORMAT_SHORT_TERM || "h:mm A";
const MEDIUM_TERM_FORMAT = process.env.REACT_APP_IMF_TIME_FORMAT_MEDIUM_TERM || "dddd";
const LONG_TERM_FORMAT = process.env.REACT_APP_IMF_TIME_FORMAT_LONG_TERM || "MMM. d, YYYY";

export const getHumanTimeShortTmer = (timestamp: number) =>
    dayjs(timestamp).format(SHORT_TERM_FORMAT);
export const getHumanTimeMediumTerm = (timestamp: number) =>
    dayjs(timestamp).format(MEDIUM_TERM_FORMAT);
export const getHumanTimeLongTerm = (timestamp: number) =>
    dayjs(timestamp).format(LONG_TERM_FORMAT);

export const getHumanTime = (timestamp?: number) => {
    if (!timestamp) return null;

    if (Date.now() - timestamp < DAY_IN_MS) return getHumanTimeShortTmer(timestamp);

    if (Date.now() - timestamp < WEEK_IN_MS) return getHumanTimeMediumTerm(timestamp);

    return getHumanTimeLongTerm(timestamp);
};
