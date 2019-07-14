import { Entry } from "./entries.state";

export enum EntriesActionType {
  SET_FETCHING = "SET_FETCHING",
  SET_ERROR = "SET_ERROR",
  SET_DATA = "SET_DATA",
}

export interface SetFetchingAction {
  type: EntriesActionType.SET_FETCHING;
  payload: boolean;
}

export interface SetErrorAction {
  type: EntriesActionType.SET_ERROR;
  payload: string;
}

export interface SetDataAction {
  type: EntriesActionType.SET_DATA;
  payload: Entry[];
}

export type EntriesAction = SetFetchingAction | SetDataAction | SetErrorAction;
