import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "component/transcript/ChatContainer";
import ConnectivityProvider from "component/ConnectivityProvider";
import ContactCardContainer from "component/contact/ContactCardContainer";

const StylizedApp = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
`;

const InteractivePanels = styled.div`
    order: 1;
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    max-height: calc(100vh - 30px);
`;

const StatusBar = styled.div`
    order: 2;
    min-height: 30px;
    max-height: 30px;
    overflow: hidden;
`;

const App = () => {
    const dispatch = useDispatch();
    const [selectedName, selectName] = useState<string>();

    useEffect(() => {
        dispatch(initializeClient());
    }, [dispatch]);

    return (
        <StylizedApp>
            <InteractivePanels>
                <ContactCardContainer onClickName={selectName} selectedName={selectedName} />
                {selectedName && <ChatContainer name={selectedName} />}
            </InteractivePanels>
            <StatusBar>
                <ConnectivityProvider />
            </StatusBar>
        </StylizedApp>
    );
};

export default App;
