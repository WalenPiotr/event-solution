import { FormActionType, FormAction } from "./form.types";
import { FormErrors, FormState, FormValues, FormTouched } from "./form.state";

export function formReducer(
  state = new FormState(),
  action: FormAction,
): FormState {
  switch (action.type) {
    case FormActionType.SET_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case FormActionType.CLEAR_ALL_VALUES:
      return {
        ...state,
        values: new FormValues(),
      };
    case FormActionType.SET_ERRORS:
      return {
        ...state,
        errors: {
          ...new FormErrors(),
          ...action.payload,
        },
      };
    case FormActionType.SET_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case FormActionType.CLEAR_ALL_TOUCHED:
      return {
        ...state,
        touched: new FormTouched(),
      };

    case FormActionType.SET_SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }
    case FormActionType.SET_SUBMIT_ERROR: {
      return {
        ...state,
        submitError: action.payload,
      };
    }
    default:
      return state;
  }
}
