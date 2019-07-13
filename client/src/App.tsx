import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store/root/root.reducer";
import theme from "./theme";
import Form from "./Form";
import thunkMiddleware from "redux-thunk";
import { formValidationMiddleware } from "./store/form/form.middlewares";
import logger from "redux-logger";
export default function App() {

  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, formValidationMiddleware, logger),
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Form />
      </ThemeProvider>
    </Provider>
  );
}
