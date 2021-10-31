import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectConnectivity } from "redux/connectivity/slice";
import { updateConnectivity } from "redux/mdlwr";
import { GreenCircle, RedCircle } from "./common/Circle";
import { VerticallyAlignedDiv } from "./common/AlignedDiv";

const CONNECTIVITY_CHECK_INTERVAL = 500; // ms

const StyledConnectivityProvider = styled.div`
    display: flex;
`;

const Label = styled.span`
    display: inline-flex;
    align-items: center;
    margin-left: 5px;
`;

const ConnectivityProvider = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(selectConnectivity);

    useEffect(() => {
        setInterval(() => {
            dispatch(updateConnectivity());
        }, CONNECTIVITY_CHECK_INTERVAL);
    }, [dispatch]);

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
