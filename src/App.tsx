import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "component/chat/ChatContainer";
import ConnectivityProvider from "component/ConnectivityProvider";
import ContactCardContainer from "component/contact/ContactCardContainer";
import SearchBar from "component/SearchBar";
import { APPLE_BIGSUR_GRAY_BACKGROUND, BOX_SHADOW_COLOR } from "style/const";
import { VerticalLine } from "component/common/Line";

const APP_MARGIN = 40; // pixels

const StylizedApp = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: calc(100vh - ${APP_MARGIN}px);
    width: calc(100vw - ${APP_MARGIN}px);
    box-shadow: 0px 10px 35px ${BOX_SHADOW_COLOR};
    border-radius: 13px;
    overflow: hidden;
    margin: ${APP_MARGIN / 2}px;
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
`;

const LeftSideBar = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 350px;
    margin: 0 10px 0 10px;
    /* resize: horizontal; */
`;

const App = () => {
    const dispatch = useDispatch();
    const [selectedAlias, selectAlias] = useState<string>();

    useEffect(() => {
        dispatch(initializeClient());
    }, [dispatch]);

    return (
        <StylizedApp>
            <LeftSideBar>
                <ConnectivityProvider />
                <SearchBar />
                <ContactCardContainer onClickAlias={selectAlias} selectedAlias={selectedAlias} />
            </LeftSideBar>
            <VerticalLine />
            {selectedAlias && <ChatContainer alias={selectedAlias} />}
        </StylizedApp>
    );
};

export default App;
