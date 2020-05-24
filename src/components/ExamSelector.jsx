import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as exams from "../exams";
import Simulator from "./Simulator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: 100,
  },
}));

const ExamSelector = () => {
  const [selected, setSelected] = useState();
  const classes = useStyles();
  const levels = [];
  exams.forEach((exam) => {
    const {
      title,
      totalQuestions,
      questions,
    } = exam.data.createNewExamAttempt.exam;
    const existing = levels.find((l) => l.title === title);
    if (existing) {
      const idx = levels.indexOf(existing);
      levels[idx].versions.push(questions);
    } else {
      levels.push({ title, questions, totalQuestions, versions: [questions] });
    }
  });

  const selectExam = (exam) => () => {
    setSelected(exam);
  };

  return (
    <div className={classes.root}>
      {!selected && (
        <>
          <Typography variant="h5" gutterBottom>
            Select an exam
          </Typography>
          <Grid container spacing={3}>
            {levels.map((l) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={l.title}
                onClick={selectExam(l)}
              >
                <Paper className={classes.paper}>
                  <Typography variant="h6" className={classes.card}>
                    <span>{l.title}</span>
                    <b>{`Questions: ${l.totalQuestions}`}</b>
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {selected && <Simulator exam={selected} />}
    </div>
  );
};

export default ExamSelector;
