import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { initializeClient } from "redux/mdlwr";
import ChatContainer from "component/chat/ChatContainer";
import ConnectivityProvider from "component/ConnectivityProvider";
import ContactCardContainer from "component/contact/ContactCardContainer";

const StylizedApp = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 100vh;
`;

const LeftSideBar = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 350px;
    /* resize: horizontal; */
`;

const App = () => {
    const dispatch = useDispatch();
    const [selectedName, selectName] = useState<string>();

    useEffect(() => {
        dispatch(initializeClient());
    }, [dispatch]);

    return (
        <StylizedApp>
            <LeftSideBar>
                <ConnectivityProvider />
                <ContactCardContainer onClickName={selectName} selectedName={selectedName} />
            </LeftSideBar>
            {selectedName && <ChatContainer name={selectedName} />}
        </StylizedApp>
    );
};

export default App;
