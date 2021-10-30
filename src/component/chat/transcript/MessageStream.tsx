import { HorizontallyAlignedDiv } from "component/common/AlignedDiv";
import { APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";
import styled from "styled-components";

import IMFMessage from "typedef/IMFMessage";
import MessageView from "./MessageView";

type MessageStreamProps = {
    messages: IMFMessage[];
};

const StyledSectionHeader = styled(HorizontallyAlignedDiv)`
    margin: 10px 0;
    font-size: 0.8rem;
    color: ${APPLE_BIGSUR_GRAY_OUTLINE};
`;

const SectionHeader = ({ msg }: { msg: IMFMessage }) => <StyledSectionHeader>{msg.service}</StyledSectionHeader>;

const MessageStream = ({ messages }: MessageStreamProps) => {
    let prevService = "";

    return (
        <>
            {messages.reduce((acc, msg) => {
                if (prevService !== msg.service) {
                    acc.push(<SectionHeader msg={msg} />);
                }
                const mv = <MessageView key={msg.id} message={msg} />;
                acc.push(mv);

                prevService = msg.service;
                return acc;
            }, new Array<JSX.Element>())}
        </>
    );
};

export default MessageStream;
