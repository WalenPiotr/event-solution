import { ThunkAction } from "redux-thunk";
import { DefaultApi } from "../../generated";
import { fetchData } from "../entries/entries.actions";
import { RootState } from "../root/root.reducer";
import { FormErrors, FormTouched, FormValues } from "./form.state";
import {
  FormAction,
  FormActionType,
  SetValuesAction,
  SetTouchedAction,
  SubmitFormAction,
} from "./form.types";

export function setValues(values: Partial<FormValues>): SetValuesAction {
  return {
    type: FormActionType.SET_VALUES,
    values,
  };
}

export function setTouched(touched: Partial<FormTouched>): SetTouchedAction {
  return {
    type: FormActionType.SET_TOUCHED,
    touched,
  };
}

export function submitForm(): SubmitFormAction {
  return {
    type: FormActionType.SUBMIT_FORM,
  };
}

// const hasFormError = (errors: FormErrors) =>
//   Object.values(errors).reduce((prev, curr) => prev || curr !== null, false);

// export const submitForm = (
//   apiClient: DefaultApi,
// ): ThunkAction<void, RootState, null, FormAction> => async (
//   dispatch,
//   getState,
// ) => {
//   dispatch({ type: FormActionType.SET_SUBMITTING, payload: true });
//   dispatch({ type: FormActionType.SET_ALL_TOUCHED });
//   const { values, errors } = getState().form;
//   if (hasFormError(errors)) {
//     dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
//     return;
//   }
//   try {
//     const response = await apiClient.entryPost({ ...values });
//   } catch (err) {
//     if (err.status && err.status === 409) {
//       const errPayload = await err.json();
//       dispatch({
//         type: FormActionType.SET_ALREADY_EXISTS_ERROR,
//         payload: errPayload.message,
//       });
//       dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
//       return;
//     }
//     if (err.status && err.status === 400) {
//       const errPayload = await err.json();
//       dispatch({
//         type: FormActionType.SET_SUBMIT_ERROR,
//         payload: "Invalid Request",
//       });
//       dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
//       return;
//     }
//     dispatch({
//       type: FormActionType.SET_SUBMIT_ERROR,
//       payload: "Connection Error",
//     });
//     dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
//     return;
//   }
//   dispatch(fetchData(apiClient));
//   dispatch({ type: FormActionType.CLEAR_ALL_VALUES });
//   dispatch({ type: FormActionType.CLEAR_ALL_TOUCHED });
//   dispatch({ type: FormActionType.SET_SUBMITTING, payload: false });
//   return;
// };
