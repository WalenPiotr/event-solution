import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry } from "../store/entries/entries.actions";
import { Entry, EntriesState } from "../store/entries/entries.state";
import { RootState } from "../store/root/root.reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

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
  spinnerBox: {
    margin: "0 auto",
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  spinnerText: {
    marginTop: theme.spacing(1),
  },
}));

const EntryView = () => {
  const { items, fetching, fetchError } = useSelector<RootState, EntriesState>(
    state => state.entries,
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(deleteEntry(id));
  };
  if (fetchError) {
    return (
      <div className={classes.spinnerBox}>
        <ErrorIcon color="error" style={{ fontSize: 60 }} />
        <Typography
          variant="subtitle1"
          color="error"
          className={classes.spinnerText}
        >
          Something went wrong
        </Typography>
      </div>
    );
  }
  if (fetching) {
    return (
      <div className={classes.spinnerBox}>
        <CircularProgress size={50} />
        <Typography
          variant="subtitle1"
          color="primary"
          className={classes.spinnerText}
        >
          Loading already added entries...
        </Typography>
      </div>
    );
  }
  return (
    <div>
      {items.map(e => (
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
              onClick={handleClick(e._id)}
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
