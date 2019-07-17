import { ActionsObservable, StateObservable } from "redux-observable";
import {
  EntriesActionType,
  DeleteEntryAction,
  FetchDataAction,
} from "./entries.types";
import { of, Subject } from "rxjs";
import { RootState } from "../root/root.reducer";
import { fetchDataEpic, deleteEntryEpic } from "./entries.epics";
import { stub } from "sinon";
import { FetchErrorMsg } from "../../errors";
import { toArray } from "rxjs/operators";

describe("form epic tests", () => {
  describe("fetchDataEpic", () => {
    it("should return FetchDataFailureAction when apiClient rejects", async () => {
      const action$ = new ActionsObservable<FetchDataAction>(
        of({
          type: EntriesActionType.FETCH_DATA,
        }),
      );
      const initialState = new RootState();
      const state$ = new StateObservable(
        new Subject<RootState>(),
        initialState,
      );
      const entryGetStub = stub();
      entryGetStub.rejects();
      const dependencies = {
        apiClient: {
          entryGet: jest.fn(entryGetStub),
        },
      };
      const output$ = fetchDataEpic(action$, state$, dependencies as any);
      expect(await output$.toPromise()).toEqual({
        type: EntriesActionType.FETCH_DATA_FAILURE,
        message: FetchErrorMsg.CONNECTION_ERROR,
      });
    });
    it("should return FetchDataSuccessAction when apiClient resolves", async () => {
      const action$ = new ActionsObservable<FetchDataAction>(
        of({
          type: EntriesActionType.FETCH_DATA,
        }),
      );
      const initialState = new RootState();
      const state$ = new StateObservable(
        new Subject<RootState>(),
        initialState,
      );
      const entries = [
        {
          firstName: "John",
          lastName: "Doe",
          email: "email@example.com",
          date: new Date(),
        },
      ];
      const jsonStub = stub();
      jsonStub.resolves(entries);
      const entryGetStub = stub();
      entryGetStub.resolves({
        json: jest.fn(jsonStub),
      });
      const dependencies = {
        apiClient: {
          entryGet: jest.fn(entryGetStub),
        },
      };
      const output$ = fetchDataEpic(action$, state$, dependencies as any);
      expect(await output$.toPromise()).toEqual({
        type: EntriesActionType.FETCH_DATA_SUCCESS,
        entries,
      });
    });
  });
  describe("deleteEntryEpic", () => {
    it("should return DeleteEntryFailureAction when apiClient rejects", async done => {
      const action$ = new ActionsObservable<DeleteEntryAction>(
        of({
          type: EntriesActionType.DELETE_ENTRY,
          entry: { id: "1" },
        }),
      );
      const initialState = new RootState();
      const state$ = new StateObservable(
        new Subject<RootState>(),
        initialState,
      );
      const entryDeleteStub = stub();
      entryDeleteStub.rejects();
      const dependencies = {
        apiClient: {
          entryIdDelete: jest.fn(entryDeleteStub),
        },
      };
      const output$ = deleteEntryEpic(action$, state$, dependencies as any);

      output$.pipe(toArray()).subscribe(actionArray => {
        expect(actionArray).toContainEqual({
          type: EntriesActionType.DELETE_ENTRY_FAILURE,
          message: FetchErrorMsg.CONNECTION_ERROR,
        });
        done();
      });
    });
    it("should return DeleteEntrySuccessAction when apiClient resolves", async done => {
      const action$ = new ActionsObservable<DeleteEntryAction>(
        of({
          type: EntriesActionType.DELETE_ENTRY,
          entry: { id: "1" },
        }),
      );
      const initialState = new RootState();
      const state$ = new StateObservable(
        new Subject<RootState>(),
        initialState,
      );
      const jsonStub = stub();
      jsonStub.resolves({});
      const entryDeleteStub = stub();
      entryDeleteStub.resolves({
        json: jest.fn(jsonStub),
      });
      const dependencies = {
        apiClient: {
          entryIdDelete: jest.fn(entryDeleteStub),
        },
      };
      const output$ = deleteEntryEpic(action$, state$, dependencies as any);

      output$.pipe(toArray()).subscribe(actionArray => {
        expect(actionArray).toContainEqual({
          type: EntriesActionType.DELETE_ENTRY_SUCCESS,
        });
        expect(actionArray).toContainEqual({
          type: EntriesActionType.FETCH_DATA,
        });
        done();
      });
    });
  });
});
