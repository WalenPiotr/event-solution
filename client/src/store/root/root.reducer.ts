import { combineReducers } from "redux";
import { formReducer } from "../form/form.reducer";
import { FormState } from "../form/form.state";
import { entriesReducer } from "../entries/entries.reducer";
import { EntriesState } from "../entries/entries.state";

export class RootState {
  form: FormState = new FormState();
  entries: EntriesState = new EntriesState();
}

export const rootReducer = combineReducers<RootState>({
  form: formReducer,
  entries: entriesReducer,
});
