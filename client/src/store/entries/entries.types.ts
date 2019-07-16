import { Entry } from "./entries.state";
import { FetchErrorMsg } from "../../errors";

export enum EntriesActionType {
  FETCH_DATA = "FETCH_DATA",
  FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",

  DELETE_ENTRY = "DELETE_ENTRY",
  DELETE_ENTRY_SUCCESS = "DELETE_ENTRY_SUCCESS",
  DELETE_ENTRY_FAILURE = "DELETE_ENTRY_FAILURE",
}

export interface FetchDataAction {
  type: EntriesActionType.FETCH_DATA;
}

export interface FetchDataSuccessAction {
  type: EntriesActionType.FETCH_DATA_SUCCESS;
  entries: Entry[];
}

export interface FetchDataFailureAction {
  type: EntriesActionType.FETCH_DATA_FAILURE;
  message: FetchErrorMsg;
}

export interface DeleteEntryAction {
  type: EntriesActionType.DELETE_ENTRY;
  entry: { id: string };
}

export interface DeleteEntrySuccessAction {
  type: EntriesActionType.DELETE_ENTRY_SUCCESS;
}

export interface DeleteEntryFailureAction {
  type: EntriesActionType.DELETE_ENTRY_FAILURE;
  message: FetchErrorMsg;
}

export type EntriesAction =
  | FetchDataAction
  | FetchDataSuccessAction
  | FetchDataFailureAction
  | DeleteEntryAction
  | DeleteEntrySuccessAction
  | DeleteEntryFailureAction;
