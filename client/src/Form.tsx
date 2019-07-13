import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValues, setTouched } from "./store/form/form.actions";
import { RootState } from "./store/root/root.reducer";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {
  FormValues,
  FormErrors,
  FormTouched,
  FormState,
} from "./store/form/form.interfaces";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import { apiClient } from "./configureClient";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "300px",
    margin: "0 auto",
  },
  input: {
    display: "block",
    margin: theme.spacing(2),
  },
}));

const Form = () => {
  const formState = useSelector<RootState, FormState>(state => state.form);

  const values = useSelector<RootState, FormValues>(state => state.form.values);
  const errors = useSelector<RootState, FormErrors>(state => state.form.errors);
  const touched = useSelector<RootState, FormTouched>(
    state => state.form.touched,
  );
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
  };
  const classes = useStyles();

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      dispatch(setValues({ date }));
    }
  };

  const onClick = async () => {
    const res = await apiClient.postEvent({
      eventDto: {
        firstName: "first name",
        lastName: "last name",
        email: "new@email.com",
        date: "2019-07-13T08:47:46Z",
      },
    });
    console.log(res.body);
  };

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
      <Button onClick={onClick}>Click me</Button>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </Paper>
  );
};

export default React.memo(Form);
