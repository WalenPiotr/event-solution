import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles, withStyles } from "@material-ui/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTouched, setValues } from "../store/form/form.actions";
import { FormState } from "../store/form/form.state";
import { submitForm } from "../store/form/form.actions";
import { RootState } from "../store/root/root.reducer";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { apiClient } from "../clientConfig";
import { FetchErrorMsg } from "../errors";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: "0 auto",
    width: "400px",
    padding: theme.spacing(2),
  },
  input: {
    display: "block",
    marginBottom: theme.spacing(2),
  },
  errorBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  errorIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Form = () => {
  const formState = useSelector<RootState, FormState>(state => state.form);
  const { values, errors, touched, isSubmitting, submitError } = formState;

  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { name, value } = event.target;
    dispatch(setValues({ [name]: value }));
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.persist();
    const { name } = event.target;
    dispatch(setTouched({ [name]: true }));
  };
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(submitForm());
  };
  const classes = useStyles();

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      dispatch(setValues({ date }));
    }
  };
  const alreadyExistsError = submitError === FetchErrorMsg.ALREADY_EXISTS;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Enter data</Typography>
      <TextField
        name="firstName"
        label="first name"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.firstName && touched.firstName)}
        helperText={
          Boolean(errors.firstName && touched.firstName) ? errors.firstName : ""
        }
        className={classes.input}
        fullWidth
      />
      <TextField
        name="lastName"
        label="last name"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.lastName && touched.lastName)}
        helperText={
          Boolean(errors.lastName && touched.lastName) ? errors.lastName : ""
        }
        className={classes.input}
        fullWidth
      />
      <TextField
        name="email"
        label="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          Boolean(errors.email && touched.email) ||
          Boolean(alreadyExistsError && touched.email)
        }
        helperText={
          Boolean(errors.email && touched.email)
            ? errors.email
            : Boolean(alreadyExistsError && touched.email)
            ? alreadyExistsError
            : ""
        }
        className={classes.input}
        fullWidth
      />
      <div className={classes.input}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="mui-pickers-date"
            label="Date picker"
            value={values.date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </div>

      {submitError ? (
        <div className={classes.errorBox}>
          <ErrorIcon color="error" className={classes.errorIcon} />
          <Typography color="error" variant="subtitle1">
            {submitError === FetchErrorMsg.ALREADY_EXISTS
              ? "Entry with given name already exists"
              : null}
            {submitError === FetchErrorMsg.INTERNAL_ERROR
              ? "Unexpected Error"
              : null}
            {submitError === FetchErrorMsg.INVALID_ARGUMENT
              ? "Unexpected Error"
              : null}
            {submitError === FetchErrorMsg.CONNECTION_ERROR
              ? "Connection Error"
              : null}
          </Typography>
        </div>
      ) : null}

      <Button
        disabled={isSubmitting}
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Paper>
  );
};

export default React.memo(Form);
