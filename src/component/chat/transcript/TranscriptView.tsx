import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Transcript from "typedef/Transcript";
import MessageView from "./MessageView";
import QuickscrollButton from "./QucikscrollButton";

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

const TranscriptView = ({ transcript, markAsRead }: TranscriptViewProps) => {
    const [isAtBottom, setAtBottom] = useState(true);
    const scrollTargetRef = useRef(null);

    useEffect(() => {
        if (isAtBottom && transcript.hasUnreadMessages) {
            markAsRead();
        }
    }, [isAtBottom, markAsRead, transcript.hasUnreadMessages]);

    useEffect(() => {
        // Automatically scroll to the bottom when a new message arrives.
        if (isAtBottom) {
            scrollToBottom();
        }
    }, [transcript.messages.length]);

    // @ts-ignore
    const onScroll = (e) => {
        const positionDiff = e.target.scrollHeight - e.target.scrollTop;
        const isAtBottom = positionDiff - IS_BOTTOM_OFFSET_THRESHOLD <= e.target.clientHeight;
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
            {transcript.messages.map((msg) => (
                <MessageView key={msg.id} message={msg} />
            ))}
            <ScrollTarget ref={scrollTargetRef} />
            <QuickscrollButton scroll={scrollToBottom} hasUnreadMessages={transcript.hasUnreadMessages} isAtBottom />
        </StyledTranscriptView>
    );
};

export default TranscriptView;
