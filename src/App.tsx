import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "component/chat/ChatContainer";
import ConnectivityProvider from "component/ConnectivityProvider";
import NotificationProvider from "component/NotificationProvider";
import PreviewCardContainer from "component/preview/PreviewCardContainer";
import SearchBar from "component/SearchBar";
import { APPLE_BIGSUR_GRAY_BACKGROUND, APPLE_BIGSUR_GRAY_OUTLINE, BOX_SHADOW_COLOR } from "style/const";
import Settings from "component/Settings";

const APP_MARGIN = 40; // pixels

const StyledApp = styled.div`
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

const Sidebar = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 350px;
    padding: 0 10px 0 10px;
    border-right: 1px solid ${APPLE_BIGSUR_GRAY_OUTLINE};
    /* resize: horizontal; */
`;

const App = () => {
    const dispatch = useDispatch();
    const [selectedAlias, selectAlias] = useState<string>();

    useEffect(() => {
        dispatch(initializeClient());
    }, [dispatch]);

    return (
        <StyledApp>
            <Sidebar>
                <Settings />
                <SearchBar />
                <PreviewCardContainer onClickAlias={selectAlias} selectedAlias={selectedAlias} />
            </Sidebar>
            <ChatContainer alias={selectedAlias} />
        </StyledApp>
    );
};

export default App;
