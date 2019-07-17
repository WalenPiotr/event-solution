import { combineEpics, Epic, ofType } from "redux-observable";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { mapErrorToMessage } from "../../errors";
import { EpicWithDependecies } from "../../reduxConfig";
import {
  DeleteEntryAction,
  DeleteEntryFailureAction,
  DeleteEntrySuccessAction,
  EntriesActionType,
  FetchDataAction,
  FetchDataFailureAction,
  FetchDataSuccessAction,
} from "./entries.types";
import { from, of } from "rxjs";

export const fetchDataEpic: EpicWithDependecies = (
  action$,
  state$,
  { apiClient },
) =>
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

export const deleteEntryEpic: Epic = (action$, state$, { apiClient }) =>
  action$.pipe(
    ofType(EntriesActionType.DELETE_ENTRY),
    switchMap((action: DeleteEntryAction) => {
      const { id } = action.entry;
      const resultAction: DeleteEntrySuccessAction = {
        type: EntriesActionType.DELETE_ENTRY_SUCCESS,
      };
      const fetchAction: FetchDataAction = {
        type: EntriesActionType.FETCH_DATA,
      };
      return from(apiClient.entryIdDelete(id)).pipe(
        switchMap(() => of(resultAction, fetchAction)),
        catchError(async err => {
          const message = mapErrorToMessage(err);
          const resultAction: DeleteEntryFailureAction = {
            type: EntriesActionType.DELETE_ENTRY_FAILURE,
            message,
          };
          return resultAction;
        }),
      );
    }),
  );

export const entriesEpic = combineEpics(fetchDataEpic, deleteEntryEpic);
