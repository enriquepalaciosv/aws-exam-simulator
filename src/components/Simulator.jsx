import React, { useState } from "react";
import Stepper from "./Stepper";
import Question from "./Question";

const Simulator = ({ exam }) => {
  const [activeStep, setActiveStep] = useState(0);
  const formatted = exam.questions.map((q) => {
    const noSelected = q.answers.map((an) => ({ ...an, selected: false }));
    return { ...q, answers: noSelected };
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
    console.log("evaluation", evaluated);
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

  return (
    <>
      <Stepper
        totalQuestions={exam.totalQuestions}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
      <Question
        question={questions[activeStep].question}
        answers={questions[activeStep].answers}
        activeStep={activeStep}
        totalQuestions={exam.totalQuestions}
        onSelection={handleChange}
        handleNext={handleNext}
      />
    </>
  );
};

export default Simulator;
