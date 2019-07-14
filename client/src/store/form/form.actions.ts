import { FormAction, FormActionType } from "./form.types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../root/root.reducer";
import { apiClient } from "../../clientConfig";
import { EntriesActionType } from "../entries/entries.types";
import { fetchData } from "../entries/entries.actions";

export function setValues(values: {
  [key: string]: string | Date;
}): FormAction {
  return {
    type: FormActionType.SET_VALUES,
    payload: values,
  };
}

export function setTouched(touched: { [key: string]: boolean }): FormAction {
  return {
    type: FormActionType.SET_TOUCHED,
    payload: touched,
  };
}

export const submitForm = (): ThunkAction<
  void,
  RootState,
  null,
  FormAction
> => async (dispatch, getState) => {
  dispatch({ type: FormActionType.SET_SUBMITTING, payload: true });
  dispatch({ type: FormActionType.SET_ALL_TOUCHED, payload: true });
  const { values } = getState().form;
  try {
    const response = await apiClient.entryPost({ ...values });
    const payload = await response.json();
    //here dispatch fetch new event list
  } catch (err) {
    if (err.status && err.status === 400) {
      const errPayload = await err.json();
      console.error(errPayload);
      dispatch({
        type: FormActionType.SET_SUBMIT_ERROR,
        payload: "Invalid Request",
      });
    } else {
      dispatch({
        type: FormActionType.SET_SUBMIT_ERROR,
        payload: "Connection Error",
      });
    }
  }
  dispatch(fetchData());
  dispatch({ type: FormActionType.CLEAR_ALL_VALUES, payload: false });
  dispatch({ type: FormActionType.CLEAR_ALL_TOUCHED, payload: false });
  dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
  return;
};
