import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectLastNotified } from "redux/transcript/slice";

import mp3 from "asset/notify.mp3";

const NotificationProvider = () => {
    const lastNotified = useSelector(selectLastNotified);
    const [audioComponent, setAudioComponent] = useState<JSX.Element>();

    const unmountAudio = () => setAudioComponent(undefined);

    useEffect(() => {
        setAudioComponent(<audio src={mp3} autoPlay />);
        setTimeout(unmountAudio, 1500);
    }, [lastNotified]);

    return audioComponent || null;
};

export default NotificationProvider;
