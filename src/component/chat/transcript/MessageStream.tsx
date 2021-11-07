import { HorizontallyAlignedDiv } from "component/common/AlignedDiv";
import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";
import styled from "styled-components";

import IMFMessage from "typedef/IMFMessage";
import { getHumanDate } from "util/datetime";
import MessageView from "./MessageView";

type MessageStreamProps = {
    messages: IMFMessage[];
};

const StyledSectionHeader = styled(HorizontallyAlignedDiv)`
    margin: 10px 0;
    font-size: 0.8rem;
    color: ${APPLE_BIGSUR_GRAY_OUTLINE};
`;

const MessageStream = ({ messages }: MessageStreamProps) => {
    let prevDayOfMonth = 0;
    let prevService = "";

    return (
        <>
            {messages.reduce((acc, msg) => {
                const dayOfMonth = new Date(msg.timestamp).getDate();
                if (prevDayOfMonth !== dayOfMonth) {
                    acc.push(
                        <StyledSectionHeader key={`${msg.id}-header-date`}>
                            {getHumanDate(msg.timestamp)}
                        </StyledSectionHeader>
                    );
                }
                if (prevService !== msg.service) {
                    acc.push(<StyledSectionHeader key={`${msg.id}-header-service`}>{msg.service}</StyledSectionHeader>);
                }
                const mv = <MessageView key={msg.id} message={msg} />;
                acc.push(mv);

                prevDayOfMonth = dayOfMonth;
                prevService = msg.service;
                return acc;
            }, new Array<JSX.Element>())}
        </>
    );
};

export default MessageStream;
