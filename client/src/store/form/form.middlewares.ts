import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState } from "../root/root.reducer";
import { FormAction, FormActionType } from "./form.types";
import { validateFormValues, FormValues } from "./form.state";

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
    dispatch({ type: FormActionType.SET_ERRORS, payload: formErrors });
  }
  if (action.type === FormActionType.CLEAR_ALL_VALUES) {
    const formErrors = validateFormValues(new FormValues());
    dispatch({ type: FormActionType.SET_ERRORS, payload: formErrors });
  }

  return next(action);
};
