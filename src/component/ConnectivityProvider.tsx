import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectConnectivity } from "redux/connectivity/slice";
import { GreenCircle, RedCircle } from "./common/Circle";
import { VerticallyAlignedDiv } from "./common/AlignedDiv";

const StyledConnectivityProvider = styled.div`
    display: flex;
`;

const Label = styled.span`
    display: inline-flex;
    align-items: center;
    margin-left: 5px;
`;

const ConnectivityProvider = () => {
    const isOnline = useSelector(selectConnectivity);

    const indicator = isOnline ? <GreenCircle /> : <RedCircle />;
    const label = isOnline ? "Online" : "Offline";

    return (
        <StyledConnectivityProvider>
            <VerticallyAlignedDiv>{indicator}</VerticallyAlignedDiv>
            <Label>{label}</Label>
        </StyledConnectivityProvider>
    );
};

export default ConnectivityProvider;
