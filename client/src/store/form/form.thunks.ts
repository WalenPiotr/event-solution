import { ThunkAction } from "redux-thunk";
import { RootState } from "../root/root.reducer";
import { FormAction, FormActionType } from "./form.types";
import { setSubmitting, setValues, setSubmitError } from "./form.actions";

export const submitForm = (): ThunkAction<
  void,
  RootState,
  null,
  FormAction
> => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const { values } = getState().form;
  const eventDto = { ...values, date: values.date.toISOString() };

  // try {
  //   const res = await apiClient.postEvent({
  //     eventDto,
  //   });
  // } catch (e) {
  //   console.log(e.response);
  //   dispatch(setSubmitError(e.toString() as string));
  // }

  dispatch(setSubmitting(false));
};
