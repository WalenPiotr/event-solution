import { EntriesState } from "./entries.state";
import { EntriesAction, EntriesActionType } from "./entries.types";

export function entriesReducer(
  state = new EntriesState(),
  action: EntriesAction,
): EntriesState {
  switch (action.type) {
    case EntriesActionType.SET_DATA:
      return {
        ...state,
        items: action.payload,
      };
    case EntriesActionType.SET_FETCHING:
      return {
        ...state,
        fetching: action.payload,
      };
    case EntriesActionType.SET_FETCH_ERROR:
      return {
        ...state,
        fetchError: action.payload,
      };
    case EntriesActionType.SET_DELETING:
      return {
        ...state,
        deleting: action.payload,
      };
    case EntriesActionType.SET_DELETE_ERROR:
      return {
        ...state,
        deleteError: action.payload,
      };
    default:
      return state;
  }
}
