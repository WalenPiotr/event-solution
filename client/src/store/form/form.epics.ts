import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap, withLatestFrom } from "rxjs/operators";
import { mapErrorToMessage } from "../../errors";
import { EpicWithDependecies } from "../../reduxConfig";
import { EntriesActionType, FetchDataAction } from "../entries/entries.types";
import { RootState } from "../root/root.reducer";
import { hasFormError } from "./form.state";
import {
  CancelSubmitFormAction,
  FormActionType,
  SubmitFormAction,
  SubmitFormFailureAction,
  SubmitFormSuccessAction,
} from "./form.types";

export const submitFormEpic: EpicWithDependecies = (
  action$,
  state$,
  { apiClient },
) =>
  action$.pipe(
    ofType(FormActionType.SUBMIT_FORM),
    withLatestFrom(state$),
    switchMap(([action, state]: [SubmitFormAction, RootState]) => {
      if (hasFormError(state.form.errors)) {
        const cancelAction: CancelSubmitFormAction = {
          type: FormActionType.CANCEL_SUBMIT,
        };
        return of(cancelAction);
      }
      const resultAction: SubmitFormSuccessAction = {
        type: FormActionType.SUBMIT_FORM_SUCCESS,
      };
      const refetchAction: FetchDataAction = {
        type: EntriesActionType.FETCH_DATA,
      };
      return from(apiClient.entryPost(state.form.values)).pipe(
        switchMap(() => of(resultAction, refetchAction)),
      );
    }),
    catchError(async err => {
      const message = mapErrorToMessage(err);
      const resultAction: SubmitFormFailureAction = {
        type: FormActionType.SUBMIT_FORM_FAILURE,
        message,
      };
      return resultAction;
    }),
  );

export const formEpic = combineEpics(submitFormEpic);
