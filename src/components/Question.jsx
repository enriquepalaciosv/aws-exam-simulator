import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  question: {
    marginTop: 20,
    marginBottom: 20,
  },
  answer: {
    textAlign: "start",
    cursor: "pointer",
  },
});

const Question = ({
  question,
  answers,
  totalQuestions,
  activeStep,
  handleNext,
  onSelection,
}) => {
  const classes = useStyles();

  const handleChange = (answer) => (event) => {
    const newAnswers = answers.map((a) =>
      a.id === answer.id ? { ...a, selected: event.target.checked } : a
    );
    onSelection(newAnswers);
  };

  return (
    <Card className={classes.question}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`Question ${activeStep + 1} out of ${totalQuestions}`}
        </Typography>
        <Typography variant="h5" component="h2">
          {question}
        </Typography>

        {answers.map((answer) => (
          <Typography
            variant="body1"
            component="p"
            key={answer.text}
            className={classes.answer}
          >
            <Checkbox
              checked={answer.selected}
              onChange={handleChange(answer)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {answer.text}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleNext}>
          Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default Question;
