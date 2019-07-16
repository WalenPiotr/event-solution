import { fetchData, entryDelete } from "./entries.actions";
import { EntriesActionType } from "./entries.types";

describe("entries actions", () => {
  describe("fetchData", () => {
    it("should fetch data", () => {
      const action = fetchData();
      expect(action).toEqual({
        type: EntriesActionType.FETCH_DATA,
      });
    });
  });
  describe("entryDelete", () => {
    it("should delete data", () => {
      const action = entryDelete("1");
      expect(action).toEqual({
        type: EntriesActionType.DELETE_ENTRY,
        entry: { id: "1" },
      });
    });
  });
});
