import React, { useState } from "react";
import Stepper from "./Stepper";
import Question from "./Question";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Simulator = ({ exam }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [score, setScore] = useState(false);
  const formatted = exam.questions.map((q) => {
    const answers = q.answers.map((an) => ({ ...an, selected: false }));
    return { ...q, answers };
  });
  const [questions, setQuestions] = useState(formatted);
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
