import { combineEpics } from "redux-observable";
import { formEpic } from "../form/form.epics";
import { entriesEpic } from "../entries/entries.epics";

export const rootEpic = combineEpics(formEpic, entriesEpic);
