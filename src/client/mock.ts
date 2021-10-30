import {
    uniqueNamesGenerator as generateName,
    Config as GeneratorConfig,
    names,
} from "unique-names-generator";

// @ts-ignore
import generateSentence from "random-sentence";

import IMFMessage, { IMFOutgoingMessage } from "typedef/IMFMessage";
import IMFClient, { IMFErrorHandler, IMFEventHandler } from "./interface";
import { initializeWithLength } from "util/arrays";
import { isSometimesTrue, randomInt } from "util/rand";
import { getEnvAsNumberOrDefault } from "util/env";

// Constants for the initial data population
const MOCK_ALIAS_COUNT = getEnvAsNumberOrDefault("REACT_APP_IMF_MOCK_ALIAS_COUNT", 20);
const LOOKBACK_COUNT = getEnvAsNumberOrDefault("REACT_APP_IMF_LOOKBACK_COUNT", 1000);
const MAX_MESSAGE_AGE = getEnvAsNumberOrDefault("REACT_APP_IMF_MAX_MESSAGE_AGE", 864000000); // 10 days

// Contants forthe ongoing event handling
const RESPONSE_DELAY = getEnvAsNumberOrDefault("REACT_APP_IMF_RESPONSE_DELAY", 2500); // ms
const PING_INTERVAL = getEnvAsNumberOrDefault("REACT_APP_IMF_PING_INTERVAL", 10000); // ms

const RANDOM_NAME_CONFIG: GeneratorConfig = {
    dictionaries: [names],
};

// I might move this out to the typedef folder later when the contract becomes more clear
type Recipient = {
    alias: string;
    handles: string[];
    isGroup: boolean;
};

const generateAlias = (): string => {
    const complexity = randomInt(1, 3);
    return initializeWithLength(() => generateName(RANDOM_NAME_CONFIG), complexity).join(" ");
};

const generateHandles = (count: number): string[] =>
    initializeWithLength(() => {
        const isPhone = isSometimesTrue(0.8);
        const randomNumber = randomInt(10000000, 20000000);
        if (isPhone) {
            return `+${randomNumber}`;
        }
        return `${randomNumber}@icloud.com`;
    }, count);

const generateRecipients = (count: number): Recipient[] =>
    initializeWithLength(() => {
        const alias = generateAlias();
        const isGroup = false;
        // TODO:
        // const isGroup = isSometimesTrue(0.2);
        // if (isGroup) {
        //     alias += " and others";
        // }
        return {
            alias,
            handles: generateHandles(1),
            isGroup,
        };
    }, count);

class IMFMockClient implements IMFClient {
    onEvent?: IMFEventHandler;
    onError?: IMFErrorHandler;

    recipients: Recipient[];

    constructor() {
        this.recipients = generateRecipients(MOCK_ALIAS_COUNT);
        this.sendMessagePeriodically();
    }

    sendMessagePeriodically = () => {
        if (this.onEvent) {
            const messages = this.generateIMFMessages(1);
            this.onEvent({ messages });
        }

        setTimeout(this.sendMessagePeriodically, PING_INTERVAL);
    };

    listen = (onEvent: IMFEventHandler, onError: IMFErrorHandler) => {
        this.onEvent = onEvent;
        this.onError = onError;

        onEvent({
            messages: this.generateIMFMessages(LOOKBACK_COUNT).map((msg) => {
                msg.status = isSometimesTrue(0.5) ? "sent" : "received";
                msg.id -= randomInt(0, MAX_MESSAGE_AGE);
                msg.timestamp = msg.id;
                return msg;
            }),
        });
    };

    isOnline = () => true;

    sendMessage = (msg: IMFOutgoingMessage) => {
        const recipient = this.getOrGenerateRecipient(msg);
        this.processOutgoingMessage(msg, recipient);
        this.scheduleMockResponse(recipient);
    };

    pickRandomRecipient = (): Recipient =>
        this.recipients[Math.floor(Math.random() * this.recipients.length)];

    generateIMFMessages = (count: number): IMFMessage[] =>
        initializeWithLength(() => {
            const recipient = this.pickRandomRecipient();
            const timestamp = Date.now();
            return {
                timestamp,
                id: timestamp,
                service: "iMessage",
                status: "received",
                alias: recipient.alias,
                handle: recipient.handles[0],
                content: {
                    text: generateSentence({ min: 1, max: 12 }),
                },
            };
        }, count);

    getOrGenerateRecipient = (msg: IMFOutgoingMessage) => {
        let recipient = this.recipients.find((r) => r.handles.includes(msg.handle));
        if (!recipient) {
            recipient = generateRecipients(1)[0];
            recipient.handles = [msg.handle];
            this.recipients.push(recipient);
        }
        return recipient;
    };

    processOutgoingMessage = (msg: IMFOutgoingMessage, recipient: Recipient) => {
        this.onEvent!({
            messages: [
                {
                    id: Date.now(),
                    service: msg.service || "iMessage",
                    alias: recipient.alias,
                    handle: recipient.handles[0],
                    status: "sent",
                    timestamp: Date.now(),
                    content: msg.content,
                },
            ],
        });
    };

    scheduleMockResponse = (recipient: Recipient) =>
        setTimeout(() => {
            const message = this.generateIMFMessages(1)[0];
            message.handle = recipient.handles[0];
            message.alias = recipient.alias;
            message.status = "received";
            this.onEvent!({
                messages: [message],
            });
        }, RESPONSE_DELAY);
}

export default IMFMockClient;
