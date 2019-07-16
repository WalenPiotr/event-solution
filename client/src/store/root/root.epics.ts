import { combineEpics } from "redux-observable";
import { formEpic } from "../form/form.epics";
import { entriesEpic } from "../entries/entires.epics";

export const rootEpic = combineEpics(formEpic, entriesEpic);
