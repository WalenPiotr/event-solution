import { combineReducers } from "redux";
import { formReducer } from "../form/form.reducer";
import { FormState } from "../form/form.interfaces";

export interface RootState {
  form: FormState;
}

export const rootReducer = combineReducers<RootState>({
  form: formReducer,
});
