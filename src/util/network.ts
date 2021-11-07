export const validateHostAndPort = (hostAndPort: string) => {
    const ERR_MSG = "should be in the host:port format";
    if (!hostAndPort.includes(":")) {
        return ERR_MSG;
    }

    try {
        const url = new URL("http://" + hostAndPort);
        if (!url.port) {
            return ERR_MSG;
        }
    } catch (e) {
        return ERR_MSG;
    }
};
