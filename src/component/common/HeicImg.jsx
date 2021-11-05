import { useState } from "react";
import heicConvert from "heic-convert";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

import { APPLE_BIGSUR_GRAY_BACKGROUND, APPLE_BIGSUR_GRAY_OUTLINE } from "style/const";

// TODO better look
const StyledButton = styled.button`
    padding: 15px;
    border-radius: 10px;
    border: 1px solid ${APPLE_BIGSUR_GRAY_OUTLINE};
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
    color: black;
    text-align: center;
`;

const toMegaBytes = (size) => (size / 1000000).toFixed(2);

const HeicImg = ({ src, size }) => {
    const [convertedSrc, setConvertedSrc] = useState();
    const [isProcessing, setProcessing] = useState();
    const [error, setError] = useState();

    const showHeic = () => {
        setProcessing(true);
        return fetch(src)
            .then((res) => res.arrayBuffer())
            .then(Buffer.from)
            .then((buffer) => heicConvert({ buffer, format: "JPEG", quality: 0.5 }))
            .then((output) => btoa(output.reduce((data, byte) => `${data}${String.fromCharCode(byte)}`, "")))
            .then((imgBase64) => `data:image/png;base64,${imgBase64}`)
            .then(setConvertedSrc)
            .catch(setError)
            .finally(() => setProcessing(false));
    };

    if (isProcessing) {
        return <CircularProgress />;
    }

    if (!convertedSrc) {
        // TODO: say something about the error/retry
        const label = error ? "Retry" : "Show HEIC";
        return (
            <StyledButton onClick={showHeic}>
                <div>{label}</div>
                <div>{toMegaBytes(size)} MB</div>
            </StyledButton>
        );
    }

    return <img src={convertedSrc} alt="heic" />;
};

export default HeicImg;
