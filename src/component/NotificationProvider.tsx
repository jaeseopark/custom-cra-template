import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectLastNotified } from "redux/transcript/slice"; // ms

import mp3 from "asset/notify.mp3";

const AUDIO_RESET_INTERVAL = 1500;

const NotificationProvider = () => {
    const lastNotified = useSelector(selectLastNotified);
    const [audioComponent, setAudioComponent] = useState<JSX.Element>();

    const unmountAudio = () => setAudioComponent(undefined);

    useEffect(() => {
        setAudioComponent(<audio src={mp3} autoPlay />);
        setTimeout(unmountAudio, AUDIO_RESET_INTERVAL);
    }, [lastNotified]);

    return audioComponent || null;
};

export default NotificationProvider;
