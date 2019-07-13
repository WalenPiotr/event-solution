import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState } from "../root/root.reducer";
import { setErrors } from "./form.actions";
import { FormAction, FormActionType } from "./form.types";
import { validateFormValues } from "./form.interfaces";

export const formValidationMiddleware: Middleware = ({
  getState,
  dispatch,
}: MiddlewareAPI<Dispatch, RootState>) => (next: Dispatch) => (
  action: FormAction,
) => {
  if (action.type === FormActionType.SET_VALUES) {
    const { values } = getState().form;
    const updatedValues = { ...values, ...action.payload };
    const formErrors = validateFormValues(updatedValues);
    dispatch(setErrors(formErrors));
  }
  return next(action);
};
