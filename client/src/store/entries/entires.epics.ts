import { combineEpics, Epic, ofType } from "redux-observable";
import { catchError, mergeMap } from "rxjs/operators";
import { apiClient } from "../../clientConfig";
import {
  DeleteEntryAction,
  EntriesActionType,
  FetchDataAction,
  FetchDataFailureAction,
  FetchDataSuccessAction,
  DeleteEntrySuccessAction,
  DeleteEntryFailureAction,
} from "./entries.types";
import { Action } from "redux";
import { RootState } from "../root/root.reducer";
import { Dependencies, EpicWithDependecies } from "../../reduxConfig";
import { FetchErrorMsg, mapErrorToMessage } from "../../errors";

const fetchDataEpic: EpicWithDependecies = (action$, state$, { apiClient }) =>
  action$.pipe(
    ofType(EntriesActionType.FETCH_DATA),
    mergeMap(async (action: FetchDataAction) => {
      const response = await apiClient.entryGet();
      const entries = await response.json();
      const resultAction: FetchDataSuccessAction = {
        type: EntriesActionType.FETCH_DATA_SUCCESS,
        entries,
      };
      return resultAction;
    }),
    catchError(async err => {
      const message = mapErrorToMessage(err);
      const resultAction: FetchDataFailureAction = {
        type: EntriesActionType.FETCH_DATA_FAILURE,
        message,
      };
      return resultAction;
    }),
  );

const deleteEntryEpic: Epic = action$ =>
  action$.pipe(
    ofType(EntriesActionType.DELETE_ENTRY),
    mergeMap(async (action: DeleteEntryAction) => {
      const { id } = action.entry;
      const response = await apiClient.entryIdDelete(id);
      // const payload = await response.json();
      const resultAction: DeleteEntrySuccessAction = {
        type: EntriesActionType.DELETE_ENTRY_SUCCESS,
      };
      return resultAction;
    }),
    catchError(async err => {
      const message = mapErrorToMessage(err);
      const resultAction: DeleteEntryFailureAction = {
        type: EntriesActionType.DELETE_ENTRY_FAILURE,
        message,
      };
      return resultAction;
    }),
  );

export const entriesEpic = combineEpics(fetchDataEpic, deleteEntryEpic);
