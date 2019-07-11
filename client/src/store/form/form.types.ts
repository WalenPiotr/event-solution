export enum FormActionType {
  CHANGE_VALUE = "CHANGE_VALUE",
}

export interface HandleChangeAction {
  type: FormActionType.CHANGE_VALUE;
  payload: {
    name: string;
    value: string;
  };
}

export interface FormState {
  values: {
    [key: string]: string;
  };
}

export type FormAction = HandleChangeAction;
