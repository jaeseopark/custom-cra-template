import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";

import { HorizontallyAlignedDiv, VerticallyAlignedDiv } from "component/common/AlignedDiv";
import StyledButton, { InvertedStyledButton } from "component/common/StyledButton";
import Spacer from "component/common/FlexSpacer";

import hostScreenshot from "asset/host.png";
import styled from "styled-components";

const StyledHostnameInput = styled(HorizontallyAlignedDiv)`
    margin-top: 10px;
    height: 2rem;

    input {
        margin-right: 10px;
        outline: none;
        border: none;
        font-size: 1rem;
        padding: 5px;
        border-radius: 5px;
    }
`;

const HostnameInput = ({ connect }: { connect: (host: string) => void }) => {
    const [host, setHost] = useState("");
    return (
        <StyledHostnameInput>
            <input
                value={host}
                placeholder="Hostname"
                onKeyPress={(e) => {
                    if (host && host.trim() && e.key === "Enter") connect(host);
                }}
                onChange={(e) => setHost(e.target.value)}
            />

            <StyledButton disabled={!(host && host.trim())} onClick={() => connect(host)}>
                Connect
            </StyledButton>
            <Spacer />
        </StyledHostnameInput>
    );
};

const HelpWizard = ({ exit, connect }: { exit: () => void; connect: (host: string) => void }) => {
    const steps = [
        {
            key: "install",
            label: (
                <span>
                    Install <b>iMessageee Host</b> on a Mac
                </span>
            ),
            description: (
                <div>
                    Install the latest version of{" "}
                    <a href="https://github.com/jaeseopark/imessageee-host/releases" target="_blank" rel="noreferrer">
                        iMessageee Host
                    </a>
                    .
                </div>
            ),
        },
        {
            key: "hostname",
            label: (
                <span>
                    Find the <b>hostname</b> of the Mac
                </span>
            ),
            description: (
                <div>
                    <p>Grab the hostname from iMessageee Host. It is the first text you see after launching the app.</p>
                    <p>
                        <img src={hostScreenshot} alt="hostname" width="100%" />
                    </p>
                    <p>
                        In the above example, the hostname is <b>livingroom-imac.local</b>. Yours will be different, as
                        every computer has a different name.
                    </p>
                </div>
            ),
        },
        {
            key: "connect",
            label: "Connect to the host",
            description: (
                <div>
                    Enter the hostname from the previous step:
                    <HostnameInput connect={connect} />
                </div>
            ),
        },
    ];

    function VerticalLinearStepper() {
        const [activeStep, setActiveStep] = useState(0);

        const handleNext = () => {
            setActiveStep((prevActiveStep: number) => {
                const nextStep = prevActiveStep + 1;
                if (nextStep === steps.length) {
                    exit();
                }
                return nextStep;
            });
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        return (
            <Box sx={{ width: 600 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.key}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent className="animated">
                                <Typography>{step.description}</Typography>
                                {index < steps.length - 1 && (
                                    <HorizontallyAlignedDiv style={{ height: "35px", marginTop: "10px" }}>
                                        <StyledButton onClick={handleNext}>Continue</StyledButton>

                                        {index > 0 && (
                                            <InvertedStyledButton onClick={handleBack}>Back</InvertedStyledButton>
                                        )}
                                        <Spacer />
                                    </HorizontallyAlignedDiv>
                                )}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    }

    return (
        <VerticallyAlignedDiv>
            <HorizontallyAlignedDiv>
                <VerticalLinearStepper />
                <IconButton
                    aria-label="close"
                    onClick={exit}
                    style={{
                        right: "40px",
                        top: "40px",
                        position: "absolute",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </HorizontallyAlignedDiv>
        </VerticallyAlignedDiv>
    );
};

export default HelpWizard;
