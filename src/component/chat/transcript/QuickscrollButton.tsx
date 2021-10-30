import { HorizontallyAlignedDiv } from "component/common/AlignedDiv";
import { BOX_SHADOW_COLOR } from "style/const";
import styled from "styled-components";

type QuickscrollButtonProps = {
    scroll: () => void;
    isAtBottom: boolean;
    hasUnreadMessages: boolean;
};

const StyledQuickscrollButton = styled(HorizontallyAlignedDiv)`
    position: sticky;
    cursor: pointer;
    display: flex;
    bottom: 15px;
`;

const Label = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(6px);
    padding: 5px 15px;
    border-radius: 15px;
    box-shadow: 0px 5px 20px ${BOX_SHADOW_COLOR};
`;

const QuickscrollButton = ({ scroll, isAtBottom, hasUnreadMessages }: QuickscrollButtonProps) => {
    if (!isAtBottom || !hasUnreadMessages) {
        return null;
    }

    return (
        <StyledQuickscrollButton onClick={scroll}>
            <Label>Jump to unread message(s)</Label>
        </StyledQuickscrollButton>
    );
};

export default QuickscrollButton;
