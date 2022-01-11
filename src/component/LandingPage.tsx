import { useState, useEffect } from "react";
import styled from "styled-components";

import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "./common/AlignedDiv";
import Spacer from "./common/FlexSpacer";

import "style/LandingPage.scss";
import logo from "asset/logo400.png";
import { useDispatch } from "react-redux";
import { initializeClient } from "redux/mdlwr";
import StyledButton from "./common/StyledButton";
import HelpWizard from "./ConnectWizard";

const MOCK = "MOCK";
const DEFAULT_PORT = "3237";

const LogoAndTitle = () => {
    const Logo = styled.div`
        margin-right: 25px;
        width: 128px;
        height: 128px;
        background-image: url(${logo});
        background-size: 128px 128px;
    `;
    return (
        <HorizontallyAlignedDiv>
            <Logo />
            <VerticallyAlignedDiv>
                <Spacer />
                <span className="title">iMessageee</span>
                <Spacer />
            </VerticallyAlignedDiv>
        </HorizontallyAlignedDiv>
    );
};

const DemoButton = styled(StyledButton)`
    top: 0;
    right: 0;
    margin: 50px;
    height: 2rem;
    position: absolute;
`;

const LandingPage = () => {
    const dispatch = useDispatch();
    const [foundLastHost, setFoundLastHost] = useState(false);
    const [host, setHost] = useState("");
    const [isHelpMode, setHelpMode] = useState(false);

    useEffect(() => {
        // restore the most recently used server information
        const localLastHost = localStorage["lastHost"];
        if (localLastHost) {
            setHost(localLastHost);
            setFoundLastHost(true);
        }
    }, []);

    const connect = (host: string) => {
        localStorage["lastHost"] = host;
        dispatch(initializeClient({ host: host!, port: DEFAULT_PORT }));
    };

    const demo = () => dispatch(initializeClient({ host: MOCK, port: DEFAULT_PORT }));

    if (isHelpMode) return <HelpWizard exit={() => setHelpMode(false)} connect={connect} />;

    return (
        <VerticallyAlignedDiv className="landing-page animated">
            <DemoButton onClick={demo}>Demo</DemoButton>
            <LogoAndTitle />
            <HorizontallyAlignedDiv className="interactive-components">
                {foundLastHost ? (
                    <>
                        <StyledButton disabled={!host} onClick={() => connect(host)} style={{ marginRight: "5px" }}>
                            Continue Last Session
                        </StyledButton>
                        <StyledButton
                            onClick={() => {
                                localStorage["lastHost"] = "";
                                setHost("");
                                setFoundLastHost(false);
                            }}
                        >
                            Reset
                        </StyledButton>
                    </>
                ) : (
                    <StyledButton onClick={() => setHelpMode(true)}>Setup</StyledButton>
                )}
            </HorizontallyAlignedDiv>
        </VerticallyAlignedDiv>
    );
};

const AlignedLandingPage = () => (
    <>
        <Spacer />
        <VerticallyAlignedDiv>
            <LandingPage />
        </VerticallyAlignedDiv>
        <Spacer />
    </>
);

export default AlignedLandingPage;
