import { useEffect, useState } from "react";

const useWindowFocus = () => {
    const [isFocused, setFocused] = useState(false);

    useEffect(() => {
        const onFocus = () => setFocused(true);
        const onBlur = () => setFocused(false);

        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    return isFocused;
};

export default useWindowFocus;
