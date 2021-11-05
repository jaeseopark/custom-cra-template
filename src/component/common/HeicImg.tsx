import { SyntheticEvent, useState } from "react";

// const handleChange = (info) => {
//     setLoading(true);
//     setimageUrl(null);
//     if (info.file.originFileObj.type === "") {
//         fetch(URL.createObjectURL(info.file.originFileObj))
//             .then((res) => res.blob())
//             .then((blob) => heic2any({ blob, toType: "image/jpeg" }))
//             .then((conversionResult) => {
//                 console.log("HEIC");
//                 setimageUrl(URL.createObjectURL(conversionResult));
//                 setLoading(false);
//             })
//             .catch((e) => {
//                 console.log("error");
//                 setLoading(false);
//             });
//     } else {
//         setLoading(false);
//         setimageUrl(URL.createObjectURL(info.file.originFileObj));
//     }
// };

const HeicImg = ({ src }: { src: string }) => {
    const [convertedSrc, setConvertedSrc] = useState();

    const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        console.log(e);
    };

    if (!convertedSrc) {
        return <img src={src} onLoad={onLoad} alt="heic" />;
    }

    return null;
};

export default HeicImg;
