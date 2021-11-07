import { useSelector } from "react-redux";
import styled from "styled-components";

import ChatContainer from "component/chat/ChatContainer";
import { selectIsServerInfoReady } from "redux/connectivity/slice";
import ServerSelectionView from "component/ServerSelectionView";
import Sidebar from "component/Sidebar";
import ShadowedShell from "component/common/ShadowedShell";

const APP_MARGIN = 40; // pixels

const StyledApp = styled(ShadowedShell)`
    display: flex;
    flex-flow: row nowrap;
    width: calc(100vw - ${APP_MARGIN}px);
    height: calc(100vh - ${APP_MARGIN}px);
    margin: ${APP_MARGIN / 2}px;
`;

const App = () => {
    const isServerInfoReady = useSelector(selectIsServerInfoReady);

    if (!isServerInfoReady) {
        return (
            <StyledApp>
                <ServerSelectionView />
            </StyledApp>
        );
    }

    return (
        <StyledApp>
            <Sidebar />
            <ChatContainer />
        </StyledApp>
    );
};

export default App;
