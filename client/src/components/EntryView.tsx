import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store/root/root.reducer";
import { Entry } from "../store/entries/entries.state";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: "0 auto",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
  },
  fab: {},
}));

const EntryView = () => {
  const entries = useSelector<RootState, Entry[]>(state => state.entries.items);
  const classes = useStyles();
  return (
    <div>
      {entries.map(e => (
        <Paper key={e._id} className={classes.paper}>
          <div>
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
          </div>
          <div>
            <Fab
              color="secondary"
              aria-label="Delete"
              className={classes.fab}
              size="small"
            >
              <DeleteIcon />
            </Fab>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default EntryView;
