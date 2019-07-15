import { Entry } from "./entries.state";

export enum EntriesActionType {
  SET_FETCHING = "SET_FETCHING",
  SET_FETCH_ERROR = "SET_FETCH_ERROR",
  SET_DELETING = "SET_DELETING",
  SET_DELETE_ERROR = "SET_DELETE_ERROR",
  SET_DATA = "SET_DATA",
}

export interface SetFetchingAction {
  type: EntriesActionType.SET_FETCHING;
  payload: boolean;
}

export interface SetDeletingAction {
  type: EntriesActionType.SET_DELETING;
  payload: boolean;
}

export interface SetFetchErrorAction {
  type: EntriesActionType.SET_FETCH_ERROR;
  payload: string;
}

export interface SetDeleteErrorAction {
  type: EntriesActionType.SET_DELETE_ERROR;
  payload: string;
}

export interface SetDataAction {
  type: EntriesActionType.SET_DATA;
  payload: Entry[];
}

export type EntriesAction =
  | SetFetchingAction
  | SetDataAction
  | SetFetchErrorAction
  | SetDeletingAction
  | SetDeleteErrorAction;
