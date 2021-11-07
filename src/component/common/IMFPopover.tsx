import { useState, MouseEvent } from "react";
import Popover, { PopoverOrigin } from "@mui/material/Popover";

type IMFPopoverProps = {
    children: JSX.Element;
    content: JSX.Element;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
};

const defaultProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left",
    },
};

const IMFPopover = ({ content, anchorOrigin, transformOrigin, children }: IMFPopoverProps & typeof defaultProps) => {
    const [anchorEl, setAnchorEl] = useState<Element>();

    const handlePopoverOpen = (e: MouseEvent) => setAnchorEl(e.currentTarget as Element);

    const handlePopoverClose = () => setAnchorEl(undefined);

    const open = Boolean(anchorEl);

    return (
        <div>
            <div
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {children}
            </div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {content}
            </Popover>
        </div>
    );
};

IMFPopover.defaultProps = defaultProps;

export default IMFPopover;
