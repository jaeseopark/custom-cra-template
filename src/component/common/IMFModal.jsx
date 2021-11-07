import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { APPLE_BIGSUR_GRAY_BACKGROUND, LARGE_BOX_SHADOW } from "style/const";

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    overflow: hidden;
    border: none;
    border-radius: 12px;
    box-shadow: ${LARGE_BOX_SHADOW};
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    padding: 20px;
`;

const IMFModal = (props) => {
    const { children, onOutsideClick } = props;
    return (
        <Modal
            open
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            onClose={onOutsideClick}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in>
                <StyledBox>{children}</StyledBox>
            </Fade>
        </Modal>
    );
};

export default IMFModal;
