// TODO make this a separate library

import createLinkifyInstance from "linkify-it";
import React from "react";

const instance = createLinkifyInstance();

const getHostname = (url) => url.split("//").pop().split("/")[0];

const toElements = (matches, text) => {
    const elements = [];
    let i = 0;
    matches
        .flatMap((match) => [match.index, match.lastIndex + 1])
        .forEach((j) => {
            if (j === i) return;
            const match = matches.find((match) => match.index === i);
            if (match) {
                elements.push(
                    <a href={match.url} target="_blank" rel="noopener noreferrer">
                        {getHostname(match.url)}
                    </a>
                );
            } else {
                elements.push(<>{text.substring(i, j)}</>);
            }
            i = j;
        });
    if (i < text.length) {
        elements.push(<> {text.substring(i, text.length)}</>);
    }
    return elements;
};

const TinyLinkify = ({ children }) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.children) {
            return React.cloneElement(child, {
                children: <TinyLinkify>{child}</TinyLinkify>,
            });
        }

        if (typeof child === "string" && child) {
            if (instance.test(child)) {
                const matches = instance.match(child);
                if (matches) return toElements(matches, child);
            }
        }

        return child;
    });
};

export default TinyLinkify;
