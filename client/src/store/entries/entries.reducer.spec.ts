import { entriesReducer } from "./entries.reducer";
import { EntriesState } from "./entries.state";
import { EntriesActionType } from "./entries.types";
import { FetchErrorMsg } from "../../errors";

describe("entries reducer", () => {
  it("handles FETCH_DATA", () => {
    const initialState = new EntriesState();
    const result = entriesReducer(initialState, {
      type: EntriesActionType.FETCH_DATA,
    });
    expect(result.fetching).toBe(true);
  });
  it("handles FETCH_DATA_FAILURE", () => {
    const initialState = new EntriesState();
    const result = entriesReducer(initialState, {
      type: EntriesActionType.FETCH_DATA_FAILURE,
      message: FetchErrorMsg.CONNECTION_ERROR,
    });
    expect(result.fetching).toBe(false);
    expect(result.fetchError).toBe(FetchErrorMsg.CONNECTION_ERROR);
  });
  it("handles FETCH_DATA_SUCCESS", () => {
    const initialState = new EntriesState();
    const entries = [
      {
        _id: "123123",
        __v: 1,
        firstName: "John",
        lastName: "Doe",
        email: "user@example.com",
        date: new Date(),
      },
    ];
    const result = entriesReducer(initialState, {
      type: EntriesActionType.FETCH_DATA_SUCCESS,
      entries,
    });
    expect(result.fetching).toBe(false);
    expect(result.fetchError).toBe(null);
    expect(result.items).toBe(entries);
  });
  it("handles DELETE_ENTRY", () => {
    const initialState = new EntriesState();
    const result = entriesReducer(initialState, {
      type: EntriesActionType.DELETE_ENTRY,
      entry: { id: "1" },
    });
    expect(result.deleting).toBe(true);
  });
  it("hadnles DELETE_ENTRY_SUCCESS", () => {
    const initialState = new EntriesState();
    const result = entriesReducer(initialState, {
      type: EntriesActionType.DELETE_ENTRY_SUCCESS,
    });
    expect(result.deleting).toBe(false);
    expect(result.deleteError).toBe(null);
  });
  it("handles DELETE_ENTRY_FAILURE", () => {
    const initialState = new EntriesState();
    const result = entriesReducer(initialState, {
      type: EntriesActionType.DELETE_ENTRY_FAILURE,
      message: FetchErrorMsg.CONNECTION_ERROR,
    });
    expect(result.deleting).toBe(false);
    expect(result.deleteError).toBe(FetchErrorMsg.CONNECTION_ERROR);
  });
});
