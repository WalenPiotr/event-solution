import {
  FormState,
  setAllTouchedToTrue,
  validateFormValues,
} from "./form.state";
import { FormAction, FormActionType } from "./form.types";

export function formReducer(
  state = new FormState(),
  action: FormAction,
): FormState {
  switch (action.type) {
    case FormActionType.SET_VALUES:
      return {
        ...state,
        values: { ...state.values, ...action.values },
        errors: validateFormValues({ ...state.values, ...action.values }),
        submitError: null,
      };
    case FormActionType.SET_TOUCHED:
      return {
        ...state,
        touched: { ...state.touched, ...action.touched },
      };
    case FormActionType.SUBMIT_FORM:
      return {
        ...state,
        isSubmitting: true,
        touched: setAllTouchedToTrue(),
      };
    case FormActionType.SUBMIT_FORM_FAILURE: {
      return {
        ...state,
        isSubmitting: false,
        submitError: action.message,
      };
    }
    case FormActionType.SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }
    case FormActionType.CANCEL_SUBMIT: {
      return { ...state, isSubmitting: false };
    }
    default:
      return state;
  }
}
