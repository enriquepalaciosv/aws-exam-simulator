import React from "react";
import "./App.css";
import ExamSelector from "./components/ExamSelector";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import primary from "@material-ui/core/colors/blueGrey";
import secondary from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ExamSelector />
      </div>
    </ThemeProvider>
  );
}

export default App;
