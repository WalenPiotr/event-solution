import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTouched, setValues } from "./store/form/form.actions";
import { FormState } from "./store/form/form.state";
import { submitForm } from "./store/form/form.thunks";
import { RootState } from "./store/root/root.reducer";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: "0 auto",
    width: "400px",
  },
  input: {
    display: "block",
    margin: theme.spacing(2),
  },
}));

const Form = () => {
  const formState = useSelector<RootState, FormState>(state => state.form);
  const { values, errors, touched, isSubmitting } = formState;

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

  const hasFormError = Object.values(errors).reduce(
    (prev, curr) => prev || curr !== null,
    false,
  );

  return (
    <Paper className={classes.paper}>
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
        error={Boolean(errors.email && touched.email)}
        helperText={Boolean(errors.email && touched.email) ? errors.email : ""}
        className={classes.input}
        fullWidth
      />
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
        />
      </MuiPickersUtilsProvider>
      <Button disabled={hasFormError || isSubmitting} onClick={handleSubmit}>
        Submit
      </Button>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </Paper>
  );
};

export default React.memo(Form);
