import {
  DeleteEntryAction,
  EntriesActionType,
  FetchDataAction,
} from "./entries.types";

export const fetchData = (): FetchDataAction => ({
  type: EntriesActionType.FETCH_DATA,
});

export const entryDelete = (id: string): DeleteEntryAction => ({
  type: EntriesActionType.DELETE_ENTRY,
  entry: { id },
});
