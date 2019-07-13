import { ThunkAction } from "redux-thunk";
import { RootState } from "../root/root.reducer";
import { FormAction, FormActionType } from "./form.types";
import { setSubmitting, setValues } from "./form.actions";
import { apiClient } from "../../configureClient";

export const submitForm = (): ThunkAction<
  void,
  RootState,
  null,
  FormAction
> => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const { values } = getState().form;
  const eventDto = { ...values, date: values.date.toISOString() };
  const res = await apiClient.postEvent({
    eventDto,
  });
  dispatch(setSubmitting(false));
};
