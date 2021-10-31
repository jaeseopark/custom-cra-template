import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "component/chat/ChatContainer";
import { APPLE_BIGSUR_GRAY_BACKGROUND, BOX_SHADOW_COLOR } from "style/const";
import { selectIsServerInfoReady } from "redux/connectivity/slice";
import ServerSelectionView from "component/ServerSelectionView";
import Sidebar from "component/Sidebar";

const APP_MARGIN = 40; // pixels

const StyledApp = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: calc(100vw - ${APP_MARGIN}px);
    height: calc(100vh - ${APP_MARGIN}px);
    box-shadow: 0px 10px 35px ${BOX_SHADOW_COLOR};
    border-radius: 13px;
    overflow: hidden;
    margin: ${APP_MARGIN / 2}px;
    background-color: ${APPLE_BIGSUR_GRAY_BACKGROUND};
`;

const App = () => {
    const dispatch = useDispatch();
    const isServerInfoReady = useSelector(selectIsServerInfoReady);

    useEffect(() => {
        dispatch(initializeClient());
    }, [dispatch]);

    if (!isServerInfoReady) {
        return <ServerSelectionView />;
    }

    return (
        <StyledApp>
            <Sidebar />
            <ChatContainer />
        </StyledApp>
    );
};

export default App;
