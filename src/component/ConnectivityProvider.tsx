import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectConnectivity } from "redux/connectivity/slice";
import { updateConnectivity } from "redux/mdlwr";

const CONNECTIVITY_CHECK_INTERVAL = 500; // ms

const StylizedConnectivityProvider = styled.div`
    display: flex;
`;

const OnlineIndicator = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: ${({ isOnline }: { isOnline: boolean }) => (isOnline ? "green" : "red")};
`;

const ConnectivityProvider = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(selectConnectivity);

    useEffect(() => {
        setInterval(() => {
            dispatch(updateConnectivity());
        }, CONNECTIVITY_CHECK_INTERVAL);
    }, [dispatch]);

    return (
        <StylizedConnectivityProvider>
            <OnlineIndicator isOnline={isOnline} />
            <span>You are {isOnline ? "online" : "offline"}</span>
        </StylizedConnectivityProvider>
    );
};

export default ConnectivityProvider;
