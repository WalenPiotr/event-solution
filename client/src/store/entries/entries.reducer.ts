import { EntriesState } from "./entries.state";
import { EntriesAction, EntriesActionType } from "./entries.types";

export function entriesReducer(
  state = new EntriesState(),
  action: EntriesAction,
): EntriesState {
  switch (action.type) {
    case EntriesActionType.FETCH_DATA:
      return {
        ...state,
        fetching: true,
      };
    case EntriesActionType.FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: action.entries,
      };
    case EntriesActionType.FETCH_DATA_FAILURE:
      return {
        ...state,
        fetching: false,
        fetchError: action.message,
      };
    case EntriesActionType.DELETE_ENTRY: {
      return {
        ...state,
        deleting: true,
      };
    }
    case EntriesActionType.DELETE_ENTRY_SUCCESS: {
      return {
        ...state,
        deleting: false,
      };
    }
    case EntriesActionType.DELETE_ENTRY_FAILURE: {
      return { ...state, deleteError: action.message, deleting: false };
    }
    default:
      return state;
  }
}
