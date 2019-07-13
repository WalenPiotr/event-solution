import { FormActionType, FormAction } from "./form.types";
import { FormErrors, FormState } from "./form.state";

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
    case FormActionType.CLEAR_ERRORS: {
      return {
        ...state,
        errors: {
          ...new FormErrors(),
        },
      };
    }
    default:
      return state;
  }
}
