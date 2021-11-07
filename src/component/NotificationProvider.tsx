import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selecteTotalUnreadMessageCount, selectLastNotified } from "redux/transcript/slice";

import mp3 from "asset/notify.mp3";

import speaker0 from "asset/speaker-0.svg";
import speaker1 from "asset/speaker-1.svg";
import speaker2 from "asset/speaker-2.svg";
import speaker3 from "asset/speaker-3.svg";
import { VerticallyAlignedDiv } from "./common/AlignedDiv";

const getSpeakerSvg = (volume: number) => [speaker0, speaker1, speaker2, speaker3][volume];

type Volume = 0 | 1 | 2 | 3;

const StyledNotification = styled(VerticallyAlignedDiv)``;

const StyledSpeaker = styled.img`
    width: 16px;
    height: 16px;
`;

type AudioLoadEvent = SyntheticEvent<HTMLAudioElement, UIEvent> & { target: HTMLAudioElement };

const NotificationProvider = () => {
    const totalUnreadMessageCount = useSelector(selecteTotalUnreadMessageCount);
    const lastNotified = useSelector(selectLastNotified);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState<Volume>(1);

    useEffect(() => {
        if (!lastNotified) return;
        replay();
    }, [lastNotified]);

    useEffect(() => {
        // update favicon
        const favicon = document.getElementById("favicon") as HTMLLinkElement;
        favicon.href = totalUnreadMessageCount > 0 ? "/favicon-notify.ico" : "/favicon.ico";

        // update document title
        document.title = (totalUnreadMessageCount > 0 ? `(${totalUnreadMessageCount}) ` : "") + "imf-web";
    }, [totalUnreadMessageCount]);

    const replay = () => {
        const element = audioRef.current!;
        element.currentTime = 0;
        element.play();
    };

    const onAudioLoad = ({ target }: AudioLoadEvent) => {
        target.volume = volume / 3;
    };

    const onSpeakerClick = () => {
        const newVolume = (volume + 1) % 4;
        setVolume(newVolume as Volume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 3;
            replay();
        }
    };

    return (
        <StyledNotification>
            <StyledSpeaker src={getSpeakerSvg(volume)} alt="speaker" onClick={onSpeakerClick} />
            <audio src={mp3} ref={audioRef} onLoadedData={onAudioLoad} />
        </StyledNotification>
    );
};

export default NotificationProvider;
