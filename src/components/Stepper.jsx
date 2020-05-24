import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Stepper = ({ totalQuestions, activeStep, handleNext, handleBack }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <MobileStepper
      variant="progress"
      steps={totalQuestions}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === totalQuestions}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
};

export default Stepper;
