import { MinLength, validate, validateSync, IsEmail } from "class-validator";
import { plainToClass } from "class-transformer";
import { FormValues, FormErrors, FormTouched } from "./form.state";
import { FetchErrorMsg } from "../../errors";

export enum FormActionType {
  SUBMIT_FORM = "SUBMIT_FORM",
  SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS",
  SUBMIT_FORM_FAILURE = "SUBMIT_FORM_FAILURE",

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
  | SetTouchedAction;
