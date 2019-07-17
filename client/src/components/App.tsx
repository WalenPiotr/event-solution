import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../reduxConfig";
import theme from "../theme";
import EntryView from "./EntryView";
import Form from "./Form";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Form />
        <EntryView />
        {JSON.stringify(process.env, null, 2)}
      </ThemeProvider>
    </Provider>
  );
}
