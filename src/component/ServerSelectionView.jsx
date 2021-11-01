import { useState, useEffect } from "react";
import styled from "styled-components";

import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "./common/AlignedDiv";
import Spacer from "./common/FlexSpacer";

import "style/ServerSelectionView.scss";
import logo from "asset/logo400.png";
import PresetDropdown from "./common/PresetDropdown";

const MOCK = "(Dev) Mock Mode";

const Logo = styled.div`
    margin-right: 25px;
    width: 128px;
    height: 128px;
    /* 
    position: relative;
    top: 95px;
    left: -50px; */

    background-image: url(${logo});
    background-size: 128px 128px;
`;

const ServerSelectionView = () => {
    const [hostAndPort, setHostAndPort] = useState("");
    const [preset, setPreset] = useState("");

    useEffect(() => {
        // TODO: read from local storage
        setPreset("localhost:3237");
    }, []);

    return (
        <VerticallyAlignedDiv className="server-selection">
            <HorizontallyAlignedDiv>
                <Logo />
                <div class="title">
                    <span>Messages</span>
                    <div class="subtitle">Connect to a server to get started</div>
                </div>
            </HorizontallyAlignedDiv>
            <HorizontallyAlignedDiv>
                <PresetDropdown
                    presetId="servers"
                    defaultPreset={["localhost:3237", "localhost:3000"]}
                    secondaryPreset={[MOCK]}
                    value={hostAndPort}
                    onChange={setHostAndPort}
                />
                <div className="buttons">
                    <button>Connect</button>
                </div>
            </HorizontallyAlignedDiv>
        </VerticallyAlignedDiv>
    );
};

const AlignedServerSelectionView = () => (
    <>
        <Spacer />
        <VerticallyAlignedDiv>
            <ServerSelectionView />
        </VerticallyAlignedDiv>
        <Spacer />
    </>
);

export default AlignedServerSelectionView;
