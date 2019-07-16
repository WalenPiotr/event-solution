import { ofType, Epic, combineEpics } from "redux-observable";
import {
  FormActionType,
  SubmitFormAction,
  SubmitFormSuccessAction,
  SubmitFormFailureAction,
} from "./form.types";
import {
  mergeMap,
  merge,
  catchError,
  map,
  withLatestFrom,
} from "rxjs/operators";
import { EpicWithDependecies } from "../../reduxConfig";
import { FetchErrorMsg, mapErrorToMessage } from "../../errors";
import { RootState } from "../root/root.reducer";

const submitFormEpic: EpicWithDependecies = (action$, state$, { apiClient }) =>
  action$.pipe(
    ofType(FormActionType.SUBMIT_FORM),
    withLatestFrom(state$),
    mergeMap(async ([action, state]: [SubmitFormAction, RootState]) => {
      const response = await apiClient.entryPost(state.form.values);
      const resultAction: SubmitFormSuccessAction = {
        type: FormActionType.SUBMIT_FORM_SUCCESS,
      };
      return resultAction;
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
