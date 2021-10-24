import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "components/ChatContainer";
import ConnectivityProvider from "components/ConnectivityProvider";
import ContactContainer from "components/ContactContainer";

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
`;

const StatusBar = styled.div`
    order: 2;
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
                <ContactContainer onClickName={selectName} selectedName={selectedName} />
                {selectedName && <ChatContainer name={selectedName} />}
            </InteractivePanels>
            <StatusBar>
                <ConnectivityProvider />
            </StatusBar>
        </StylizedApp>
    );
};

export default App;
