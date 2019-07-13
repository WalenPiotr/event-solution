import { FormAction, FormActionType } from "./form.types";

export function setValues(values: {
  [key: string]: string | Date;
}): FormAction {
  return {
    type: FormActionType.SET_VALUES,
    payload: values,
  };
}

export function setErrors(errors: {
  [key: string]: string | null;
}): FormAction {
  return {
    type: FormActionType.SET_ERRORS,
    payload: errors,
  };
}

export function setTouched(touched: { [key: string]: boolean }): FormAction {
  return {
    type: FormActionType.SET_TOUCHED,
    payload: touched,
  };
}

export function setSubmitting(value: boolean): FormAction {
  return {
    type: FormActionType.SET_SUBMITTING,
    payload: value,
  };
}
