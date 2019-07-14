import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { fetchData } from "../store/entries/entries.actions";
import { formValidationMiddleware } from "../store/form/form.middlewares";
import { rootReducer } from "../store/root/root.reducer";
import theme from "../theme";
import EntryView from "./EntryView";
import Form from "./Form";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, formValidationMiddleware, logger),
);

store.dispatch(fetchData() as any);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Form />
        <EntryView />
      </ThemeProvider>
    </Provider>
  );
}
