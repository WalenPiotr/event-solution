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
    case EntriesActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
