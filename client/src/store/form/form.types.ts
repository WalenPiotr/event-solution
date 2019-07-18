import { FetchErrorMsg } from "../../errors";
import { FormTouched, FormValues } from "./form.state";

export enum FormActionType {
  SUBMIT_FORM = "SUBMIT_FORM",
  SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS",
  SUBMIT_FORM_FAILURE = "SUBMIT_FORM_FAILURE",
  CANCEL_SUBMIT = "CANCEL_SUBMIT",

  SET_VALUES = "SET_VALUES",
  SET_TOUCHED = "SET_TOUCHED",
}

export interface SetValuesAction {
  type: FormActionType.SET_VALUES;
  values: Partial<FormValues>;
}

export interface SetTouchedAction {
  type: FormActionType.SET_TOUCHED;
  touched: Partial<FormTouched>;
}

export interface SubmitFormAction {
  type: FormActionType.SUBMIT_FORM;
}

export interface CancelSubmitFormAction {
  type: FormActionType.CANCEL_SUBMIT;
}

export interface SubmitFormFailureAction {
  type: FormActionType.SUBMIT_FORM_FAILURE;
  message: FetchErrorMsg;
}

export interface SubmitFormSuccessAction {
  type: FormActionType.SUBMIT_FORM_SUCCESS;
}

export type FormAction =
  | SubmitFormAction
  | SubmitFormFailureAction
  | SubmitFormSuccessAction
  | SetValuesAction
  | SetTouchedAction
  | CancelSubmitFormAction;
