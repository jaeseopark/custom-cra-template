import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectConnectivity } from "redux/connectivity/slice";
import { updateConnectivity } from "redux/mdlwr";
import { GreenCircle, RedCircle } from "./common/Circle";
import { VerticallyAlignedDiv } from "./common/AlignedDiv";

const CONNECTIVITY_CHECK_INTERVAL = 500; // ms

const StylizedConnectivityProvider = styled.div`
    display: flex;
    height: 3rem;
    font-size: 1rem;
    padding: 1.5rem 0 1.5rem 1rem;
`;

const Label = styled.span`
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
        <StylizedConnectivityProvider>
            <VerticallyAlignedDiv>{indicator}</VerticallyAlignedDiv>
            <Label>{label}</Label>
        </StylizedConnectivityProvider>
    );
};

export default ConnectivityProvider;
