import { MinLength, validate, validateSync, IsEmail } from "class-validator";
import { plainToClass } from "class-transformer";

export enum FormActionType {
  SET_VALUES = "SET_VALUES",
  SET_ERRORS = "SET_ERRORS",
  SET_TOUCHED = "SET_TOUCHED",
  CLEAR_ERRORS = "CLEAR_ERRORS",
  SET_SUBMITTING = "SET_SUBMITTING",
  SET_SUBMIT_ERROR = "SET_SUBMIT_ERROR",
}

export interface SetValueAction {
  type: FormActionType.SET_VALUES;
  payload: {
    [key: string]: string | Date;
  };
}

export interface SetErrorsAction {
  type: FormActionType.SET_ERRORS;
  payload: {
    [key: string]: string | null;
  };
}

export interface SetTouchedAction {
  type: FormActionType.SET_TOUCHED;
  payload: {
    [key: string]: boolean;
  };
}

export interface ClearErrorsAction {
  type: FormActionType.CLEAR_ERRORS;
}

export interface SetSubmittingAction {
  type: FormActionType.SET_SUBMITTING;
  payload: boolean;
}

export interface SetSubmitErrorAction {
  type: FormActionType.SET_SUBMIT_ERROR;
  payload: string | null;
}

export type FormAction =
  | SetValueAction
  | SetErrorsAction
  | SetTouchedAction
  | ClearErrorsAction
  | SetSubmittingAction
  | SetSubmitErrorAction;
