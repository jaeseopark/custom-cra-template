import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Transcript from "typedef/Transcript";
import MessageStream from "./MessageStream";
import QuickscrollButton from "./QuickscrollButton";

const IS_BOTTOM_OFFSET_THRESHOLD = 1; // px

const StyledTranscriptView = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
    padding-bottom: 10px;
    padding-top: 7px; // the remaining 3px comes from the message bubble, which has a 3px top-margin.
`;

const ScrollTarget = styled.div``;

type TranscriptViewProps = {
    transcript: Transcript;
    markAsRead: () => void;
};

type ScrollEvent = React.UIEvent<HTMLDivElement, UIEvent> & {
    target: {
        scrollHeight: number;
        scrollTop: number;
        clientHeight: number;
    };
};

const TranscriptView = ({ transcript, markAsRead }: TranscriptViewProps) => {
    const [isAtBottom, setAtBottom] = useState(true);
    const scrollTargetRef = useRef(null);

    useEffect(() => {
        if (isAtBottom && transcript.unreadMessageCount) {
            markAsRead();
        }
    }, [isAtBottom, markAsRead, transcript.unreadMessageCount]);

    useEffect(() => {
        // Automatically scroll to the bottom when a new message arrives.
        if (isAtBottom) {
            scrollToBottom();
        }
    }, [transcript.messages.length]);

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { target } = e as ScrollEvent;
        const positionDiff = target.scrollHeight - target.scrollTop;
        const isAtBottom = positionDiff - IS_BOTTOM_OFFSET_THRESHOLD <= target.clientHeight;
        setAtBottom(isAtBottom);
    };

    const scrollToBottom = () => {
        if (scrollTargetRef) {
            const element: Element = scrollTargetRef.current!;
            element.scrollIntoView();
        }
    };

    return (
        <StyledTranscriptView onScroll={onScroll}>
            <MessageStream messages={transcript.messages} />
            <ScrollTarget ref={scrollTargetRef} />
            <QuickscrollButton
                scroll={scrollToBottom}
                hasUnreadMessages={transcript.unreadMessageCount > 0}
                isAtBottom
            />
        </StyledTranscriptView>
    );
};

export default TranscriptView;
