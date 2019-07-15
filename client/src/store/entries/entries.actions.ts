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
        type: EntriesActionType.SET_FETCH_ERROR,
        payload: "Invalid Request",
      });
      return;
    } else {
      console.error(err);
      dispatch({
        type: EntriesActionType.SET_FETCH_ERROR,
        payload: "Connection Error",
      });
    }
  }
  dispatch({
    type: EntriesActionType.SET_FETCHING,
    payload: false,
  });
};

export const deleteEntry = (
  id: string,
): ThunkAction<void, RootState, null, EntriesAction> => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: EntriesActionType.SET_DELETING,
    payload: true,
  });
  try {
    const response = await apiClient.entryIdDelete(id);
    console.log(response);
    // const payload = await response.json();
    // console.log(payload);

    dispatch(fetchData());
  } catch (err) {
    if (err.status && err.status === 400) {
      const errPayload = await err.json();
      console.error(errPayload);
      dispatch({
        type: EntriesActionType.SET_DELETE_ERROR,
        payload: "Invalid Request",
      });
      return;
    } else {
      console.error(err);
      dispatch({
        type: EntriesActionType.SET_DELETE_ERROR,
        payload: "Connection Error",
      });
    }
  }
  dispatch({
    type: EntriesActionType.SET_DELETING,
    payload: false,
  });
};
