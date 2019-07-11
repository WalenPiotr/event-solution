import { FormAction, FormActionType } from "./form.types";

export function changeValue(name: string, value: string): FormAction {
  return {
    type: FormActionType.CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  };
}
