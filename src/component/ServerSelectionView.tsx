import { useState, useEffect } from "react";
import styled from "styled-components";

import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "./common/AlignedDiv";
import Spacer from "./common/FlexSpacer";

import "style/ServerSelectionView.scss";
import logo from "asset/logo400.png";
import PresetDropdown from "./common/PresetDropdown";
import { IMFServerInfo } from "client/interface";
import { useDispatch } from "react-redux";
import { initializeClient } from "redux/mdlwr";
import { validateHostAndPort } from "util/network";
import StyledButton from "./common/StyledButton";

const MOCK = "MOCK";

const Logo = styled.div`
    margin-right: 25px;
    width: 128px;
    height: 128px;
    background-image: url(${logo});
    background-size: 128px 128px;
`;

const ServerSelectionView = () => {
    const dispatch = useDispatch();
    const [hostAndPort, setHostAndPort] = useState("");
    const [serverInfo, setServerInfo] = useState<IMFServerInfo>();

    useEffect(() => {
        if (!hostAndPort) return;

        if (hostAndPort === MOCK) {
            setServerInfo({ host: MOCK, port: "" });
        }

        const [host, port] = hostAndPort.split(":");
        setServerInfo({ host, port });
    }, [hostAndPort]);

    const onConnect = () => dispatch(initializeClient(serverInfo!));

    return (
        <VerticallyAlignedDiv className="server-selection">
            <HorizontallyAlignedDiv>
                <Logo />
                <div className="title">
                    <span>Messages</span>
                    <div className="subtitle">Connect to a server to get started</div>
                </div>
            </HorizontallyAlignedDiv>
            <HorizontallyAlignedDiv className="interactive-components">
                <PresetDropdown
                    presetId="servers"
                    defaultPreset={["localhost:3237"]}
                    secondaryPreset={process.env.NODE_ENV !== "production" ? [MOCK] : undefined}
                    value={hostAndPort}
                    onChange={setHostAndPort}
                    validate={validateHostAndPort}
                />
                <StyledButton disabled={!serverInfo} onClick={onConnect}>
                    Connect
                </StyledButton>
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
