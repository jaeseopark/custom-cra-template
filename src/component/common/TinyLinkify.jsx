import Linkify from "react-linkify";

const getHostnameText = (text) => {
    try {
        return new URL(text).hostname;
    } catch (error) {}
    return text;
};

const hostnameDecorator = (decoratedHref, _, key) => (
    <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
        {getHostnameText(decoratedHref)}
    </a>
);

const TinyLinkify = ({ children }) => <Linkify componentDecorator={hostnameDecorator}>{children}</Linkify>;

export default TinyLinkify;
