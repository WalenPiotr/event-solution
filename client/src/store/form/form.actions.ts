import { FormTouched, FormValues } from "./form.state";
import {
  FormActionType,
  SetTouchedAction,
  SetValuesAction,
  SubmitFormAction,
} from "./form.types";

export function setValues(values: Partial<FormValues>): SetValuesAction {
  return {
    type: FormActionType.SET_VALUES,
    values,
  };
}

export function setTouched(touched: Partial<FormTouched>): SetTouchedAction {
  return {
    type: FormActionType.SET_TOUCHED,
    touched,
  };
}

export function submitForm(): SubmitFormAction {
  return {
    type: FormActionType.SUBMIT_FORM,
  };
}
