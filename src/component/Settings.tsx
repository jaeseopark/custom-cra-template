import styled from "styled-components";
import Spacer from "./common/FlexSpacer";

import ConnectivityProvider from "./ConnectivityProvider";
import NotificationProvider from "./NotificationProvider";

const StyledSettings = styled.div`
    display: flex;
    height: 3rem;
    padding: 0.75rem 0 0.75rem 1rem;
`;

const Settings = () => {
    return (
        <StyledSettings>
            <ConnectivityProvider />
            <Spacer />
            <NotificationProvider />
        </StyledSettings>
    );
};

export default Settings;
