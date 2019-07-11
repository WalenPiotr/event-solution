import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./store/root/root.reducer";
import theme from "./theme";
import Form from "./Form";

export default function App() {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Form />
      </ThemeProvider>
    </Provider>
  );
}
