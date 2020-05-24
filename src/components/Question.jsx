import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

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
  info: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
});

const Question = ({
  question,
  totalQuestions,
  activeStep,
  handleNext,
  onSelection,
  resultsMode,
}) => {
  const classes = useStyles();

  const handleChange = (answer) => (event) => {
    const newAnswers = question.answers.map((a) =>
      a.id === answer.id ? { ...a, selected: event.target.checked } : a
    );
    onSelection(newAnswers);
  };

  const setStyle = (answer) => {
    if (answer.evaluated) {
      return answer.correct ? { color: "green" } : { color: "red" };
    }
    return {};
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
          {question.question}
        </Typography>
        <FormControl component="fieldset" className={classes.form}>
          <FormGroup aria-label="position">
            {question.answers.map((answer) => (
              <FormControlLabel
                style={setStyle(answer)}
                value="end"
                control={
                  <Checkbox
                    checked={answer.selected}
                    onChange={handleChange(answer)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={answer.text}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </FormControl>
      </CardContent>
      <CardActions>
        {!resultsMode && (
          <Button size="small" onClick={handleNext}>
            Answer
          </Button>
        )}
        {resultsMode && (
          <MuiAlert severity="info" className={classes.info}>
            {question.explanation}
          </MuiAlert>
        )}
      </CardActions>
    </Card>
  );
};

export default Question;
