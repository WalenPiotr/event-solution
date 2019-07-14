import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store/root/root.reducer";
import { Entry } from "../store/entries/entries.state";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: "0 auto",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: "400px",
  },
}));

const EntryView = () => {
  const entries = useSelector<RootState, Entry[]>(state => state.entries.items);
  const classes = useStyles();
  return (
    <div>
      {entries.map(e => (
        <Paper key={e._id} className={classes.paper}>
          <Typography variant="subtitle1">
            <b>first name:</b> {e.firstName}
          </Typography>
          <Typography variant="subtitle1">
            <b>last name:</b> {e.lastName}
          </Typography>
          <Typography variant="subtitle1">
            <b>first name:</b> {e.email}
          </Typography>
          <Typography variant="subtitle1">
            <b>date:</b> {e.date}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};

export default EntryView;
