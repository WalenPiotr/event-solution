import { ActionsObservable, StateObservable } from "redux-observable";
import { TestScheduler } from "rxjs/testing";
import { RootState } from "../root/root.reducer";
import { submitFormEpic } from "./form.epics";
import { FormActionType } from "./form.types";
import { FormValues, validateFormValues, FormState } from "./form.state";
import sinon from "sinon";
import { of, Subject } from "rxjs";
import { EntriesActionType } from "../entries/entries.types";
import { toArray, take } from "rxjs/operators";

describe("form epic tests", () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });
  it("should return CancelSubmitFormAction when state has form errors", async () => {
    const action$ = new ActionsObservable(
      of({
        type: FormActionType.SUBMIT_FORM,
      }),
    );
    const initialState = new RootState();
    const state$ = new StateObservable(new Subject<RootState>(), initialState);

    const dependencies = {
      apiClient: {},
    };
    const output$ = submitFormEpic(action$, state$, dependencies as any);
    expect(await output$.toPromise()).toEqual({
      type: FormActionType.CANCEL_SUBMIT,
    });
  });
  it("should return SubmitFormFailureAction if apiClient rejects", async () => {
    const action$ = new ActionsObservable(
      of({
        type: FormActionType.SUBMIT_FORM,
      }),
    );
    const initialValues = {
      firstName: "John",
      lastName: "Doe",
      email: "email@example.com",
      date: new Date(),
    };
    const initialState = {
      ...new RootState(),
      form: {
        ...new FormState(),
        values: initialValues,
        errors: validateFormValues(initialValues),
      },
    };
    const state$ = new StateObservable(new Subject<RootState>(), initialState);
    const entryPostStub = sinon.stub();
    entryPostStub.rejects();
    const dependencies = {
      apiClient: {
        entryPost: jest.fn(entryPostStub),
      },
    };
    const output$ = submitFormEpic(action$, state$, dependencies as any);
    expect(await output$.toPromise()).toEqual({
      type: FormActionType.SUBMIT_FORM_FAILURE,
      message: "CONNECTION_ERROR",
    });
  });
  it("should return SubmitFormSuccessAction if apiClient resolves", async () => {
    const action$ = new ActionsObservable(
      of({
        type: FormActionType.SUBMIT_FORM,
      }),
    );
    const initialValues = {
      firstName: "John",
      lastName: "Doe",
      email: "email@example.com",
      date: new Date(),
    };
    const initialState = {
      ...new RootState(),
      form: {
        ...new FormState(),
        values: initialValues,
        errors: validateFormValues(initialValues),
      },
    };
    const state$ = new StateObservable(new Subject<RootState>(), initialState);
    const entryPostStub = sinon.stub();
    entryPostStub.resolves();
    const dependencies = {
      apiClient: {
        entryPost: jest.fn(entryPostStub),
      },
    };
    const output$ = submitFormEpic(action$, state$, dependencies as any);

    output$.pipe(toArray()).subscribe(actionArray => {
      expect(actionArray).toEqual([
        { type: FormActionType.SUBMIT_FORM_SUCCESS },
        { type: EntriesActionType.FETCH_DATA },
      ]);
    });
  });
});
