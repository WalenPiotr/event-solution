import { ThunkAction } from "redux-thunk";
import { RootState } from "../root/root.reducer";
import { FormAction, FormActionType } from "./form.types";
import { setSubmitting, setValues, setSubmitError } from "./form.actions";
import { apiClient } from "../../clientConfig";

export const submitForm = (): ThunkAction<
  void,
  RootState,
  null,
  FormAction
> => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const { values } = getState().form;

  try {
    const response = await apiClient.eventPost({ ...values, firstName: "" });
    const payload = await response.json();
    //here dispatch fetch new event list
  } catch (err) {
    if (err.status && err.status === 400) {
      dispatch(setSubmitError("Invalid request"));
      dispatch(setSubmitting(false));
    }
    dispatch(setSubmitError("Connection Error"));
    dispatch(setSubmitting(false));
    return;
  }
  dispatch(setSubmitting(false));
  return;
};
