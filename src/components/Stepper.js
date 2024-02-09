import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import PropsType from 'prop-types';
import bidifyLogo from "../assets/images/bidify.png";



const VerticalLinearStepper = ({ activeStep = 0, forSale = false, rate = 30, chain = "Chain" }) => {

  const steps = forSale ? [
    {
      label: "Uploading data to IPFS",
      description: `Uploading data to IPFS.`,
    },
    {
      label: "Uplading metadata to IPFS",
      description: "Makding metadata and Uploading metadata to IPFS",
    },
    {
      label: "Minting NFTs...",
      description: `Minting NFT to ${chain} chai`,
    },
    {
      label: "Creating Auctions...",
      description: `This will take a few minutes and you should to confirm transactions several times.`,
    },
    {
      label: "Adding to database...",
      description: `Adding data to database.`,
    },
  ] : [
    {
      label: "Uploading data to IPFS",
      description: `Uploading data to IPFS.`,
    },
    {
      label: "Uplading metadata to IPFS",
      description: "Makding metadata and Uploading metadata to IPFS",
    },
    {
      label: "Minting NFTs...",
      description:
        "Minting NFT to BNB chain",
    },
    {
      label: "Adding to database...",
      description: `Adding data to database.`,
    },
  ];

  const CircularProgressWithLabel = (props) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', ml: -1 }}>
        <CircularProgress variant={ rate === 0 ? "indeterminate" : "determinate"} value={rate} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            { rate > 0 && `${Math.round(rate)}%` }
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 w-full bg-[#0003] flex h-[100vh]"
      id="popup-modal"
    >
      <div className="relative w-full h-auto max-w-lg px-4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
            <img
              className="mx-auto -mt-16 mb-8 w-17 h-17 bg-[#FFEAD6] rounded-full p-2 text-gray-400 dark:text-gray-200 border-[5px] border-white"
              src={bidifyLogo}
              alt="logo"
            />
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  {
                    activeStep === index ? 
                    <StepLabel StepIconComponent={CircularProgressWithLabel}>{step.label}</StepLabel> :
                    <StepLabel>{step.label}</StepLabel>
                  }
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  Successfully completed.
                </Typography>
              </Paper>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

VerticalLinearStepper.propTypes = {
  activeStep: PropsType.number,
  forSale: PropsType.bool,
  rate: PropsType.number,
  chain: PropsType.string
}

export default VerticalLinearStepper;
