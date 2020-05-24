import React, { useState } from "react";
import Stepper from "./Stepper";
import Question from "./Question";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const resetQuestions = (questions) => {
  return questions.map((q) => {
    const answers = q.answers.map((an) => ({ ...an, selected: false }));
    return { ...q, answers };
  });
};

const useStyles = makeStyles((theme) => ({
  examInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "1%",
  },
  versionSelector: {
    marginLeft: "1%",
  },
}));

const Simulator = ({ exam }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [score, setScore] = useState(false);
  const [questions, setQuestions] = useState(resetQuestions(exam.versions[0]));
  const [versionIndex, setVersionIndex] = React.useState(0);

  const handleNext = () => {
    const evaluated = questions.map((q, i) => {
      let isCorrect = true;
      const evAns = q.answers.map((ans) => {
        if ((ans.selected && !ans.correct) || (ans.correct && !ans.selected)) {
          isCorrect = false;
        }
        return { ...ans, evaluated: true };
      });
      return i === activeStep
        ? { ...q, index: i, answers: evAns, evaluation: isCorrect }
        : q;
    });
    setQuestions(evaluated);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === questions.length - 1) {
      setScore(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (answers) => {
    const newQuestions = questions.map((q, i) =>
      i === activeStep ? { ...q, answers: answers } : q
    );
    setQuestions(newQuestions);
  };

  const setAnotherExam = (event) => {
    const index = event.target.value;
    setVersionIndex(index);
    setQuestions(resetQuestions(exam.versions[index]));
  };

  if (score) {
    const correct = questions.filter((q) => q.evaluation);
    const incorrect = questions.filter((q) => !q.evaluation);
    const percent = Math.round((correct.length / exam.questions.length) * 100);
    return (
      <>
        <Typography variant="h2" gutterBottom>
          {`${percent}%`}
        </Typography>
        {incorrect.map((inc) => (
          <Question
            key={inc.question}
            question={inc}
            activeStep={inc.index}
            totalQuestions={exam.totalQuestions}
            resultsMode
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        <div className={classes.examInfo}>
          <Typography variant="h5" gutterBottom>
            {exam.title}
          </Typography>
          <FormControl className={classes.versionSelector}>
            <InputLabel id="demo-simple-select-label">Version</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={versionIndex}
              onChange={setAnotherExam}
            >
              {exam.versions.map((v, i) => (
                <MenuItem key={i} value={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Stepper
          totalQuestions={exam.totalQuestions}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
        <Question
          question={questions[activeStep]}
          activeStep={activeStep}
          totalQuestions={exam.totalQuestions}
          onSelection={handleChange}
          handleNext={handleNext}
        />
      </>
    );
  }
};

export default Simulator;
