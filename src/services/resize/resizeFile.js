import Resizer from "./Resizer";

export const resizeFile = function (file, maxW, maxH, q, minW, minH) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            maxW,
            maxH,
            "JPEG",
            q,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64",
            minW,
            minH
        );
    });
};