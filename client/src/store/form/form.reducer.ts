import { FormActionType, FormAction, FormState } from "./form.types";

const initialState: FormState = {
  values: {
    firstName: "John",
    lastName: "Doe",
    email: "john-doe@gmail.com",
  },
};

export function formReducer(
  state = initialState,
  action: FormAction,
): FormState {
  switch (action.type) {
    case FormActionType.CHANGE_VALUE:
      return {
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
