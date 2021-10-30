import { uniqueNamesGenerator as generateName, Config as GeneratorConfig, names } from "unique-names-generator";

// @ts-ignore
import generateSentence from "random-sentence";

import IMFMessage, { IMFOutgoingMessage } from "typedef/IMFMessage";
import IMFClient, { IMFErrorHandler, IMFEventHandler } from "./interface";
import { initializeWithLength } from "util/arrays";
import { isSometimesTrue, randomInt } from "util/rand";
import { getEnvAsNumber } from "util/env";

const DAY_IN_MS = 86400000; // 1000ms * 60s * 60m * 24h

const PRELOADED_RECIPIENT_COUNT = getEnvAsNumber("REACT_APP_IMF_PRELOADED_RECIPIENT_COUNT");
const PRELOADED_MESSAGES_PER_RECIPIENT = getEnvAsNumber("REACT_APP_IMF_PRELOADED_MESSAGES_PER_RECIPIENT");
const RESPONSE_DELAY = getEnvAsNumber("REACT_APP_IMF_RESPONSE_DELAY"); // ms
const PING_INTERVAL = getEnvAsNumber("REACT_APP_IMF_PING_INTERVAL"); // ms

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
        const isGroup = false; // TODO: sprinkle some group recipients.
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
        this.recipients = generateRecipients(PRELOADED_RECIPIENT_COUNT);
        this.sendMessagePeriodically();
    }

    sendMessagePeriodically = () => {
        if (this.onEvent) {
            const recipient = this.pickRandomRecipient();
            const messages = this.generateIMFMessages(recipient, 1);
            this.onEvent({ messages });
        }

        setTimeout(this.sendMessagePeriodically, PING_INTERVAL);
    };

    listen = (onEvent: IMFEventHandler, onError: IMFErrorHandler) => {
        this.onEvent = onEvent;
        this.onError = onError;

        this.recipients.forEach((recipient) => {
            const daysSinceLastMessage = randomInt(0, 10);
            const msSinceLastMessage = daysSinceLastMessage * 24 * 3600 * 1000;

            onEvent({
                messages: this.generateIMFMessages(recipient, PRELOADED_MESSAGES_PER_RECIPIENT).map((msg) => {
                    msg.status = isSometimesTrue(0.5) ? "sent" : "received";
                    msg.id = msg.id - msSinceLastMessage - randomInt(0, DAY_IN_MS);
                    msg.timestamp = msg.id;
                    return msg;
                }),
            });
        });
    };

    isOnline = () => true;

    sendMessage = (msg: IMFOutgoingMessage) => {
        const recipient = this.getOrGenerateRecipient(msg);
        this.processOutgoingMessage(msg, recipient);
        this.scheduleMockResponse(recipient);
    };

    pickRandomRecipient = (): Recipient => this.recipients[Math.floor(Math.random() * this.recipients.length)];

    generateIMFMessages = (recipient: Recipient, count: number): IMFMessage[] =>
        initializeWithLength(() => {
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
            const message = this.generateIMFMessages(recipient, 1)[0];
            message.status = "received";
            this.onEvent!({
                messages: [message],
            });
        }, RESPONSE_DELAY);
}

export default IMFMockClient;
