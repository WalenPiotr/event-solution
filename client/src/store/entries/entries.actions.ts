import { ThunkAction } from "redux-thunk";
import { apiClient } from "../../clientConfig";
import { RootState } from "../root/root.reducer";
import { EntriesAction, EntriesActionType } from "./entries.types";

export const fetchData = (): ThunkAction<
  void,
  RootState,
  null,
  EntriesAction
> => async (dispatch, getState) => {
  dispatch({
    type: EntriesActionType.SET_FETCHING,
    payload: true,
  });
  try {
    const response = await apiClient.entryGet();
    const entries = await response.json();
    dispatch({
      type: EntriesActionType.SET_DATA,
      payload: entries,
    });
  } catch (err) {
    if (err.status && err.status === 400) {
      const errPayload = await err.json();
      console.error(errPayload);
      dispatch({
        type: EntriesActionType.SET_ERROR,
        payload: "Invalid Request",
      });
      return;
    } else {
      dispatch({
        type: EntriesActionType.SET_ERROR,
        payload: "Connection Error",
      });
    }
  }
  dispatch({
    type: EntriesActionType.SET_FETCHING,
    payload: false,
  });
};
