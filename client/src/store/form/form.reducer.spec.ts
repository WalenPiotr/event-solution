import { formReducer } from "./form.reducer";
import { FormState, FormValues } from "./form.state";
import { FormActionType } from "./form.types";
import { FetchErrorMsg } from "../../errors";

describe("form reducer", () => {
  it("should handle SET_VALUES", () => {
    const initialState = new FormState();
    const result = formReducer(initialState, {
      type: FormActionType.SET_VALUES,
      values: { email: "user@example.com" },
    });
    expect(result.values.email).toEqual("user@example.com");
    expect(result.errors.email).toBeNull();
    expect(result.values.firstName).toBe("");
    expect(result.errors.firstName).not.toBeNull();
    expect(result.values.lastName).toBe("");
    expect(result.errors.lastName).not.toBeNull();
    expect(result.values.date).toBe(initialState.values.date);
    expect(result.errors.date).toBeNull();
  });
  it("should handle SET_TOUCHED", () => {
    const initialState = new FormState();
    const result = formReducer(initialState, {
      type: FormActionType.SET_TOUCHED,
      touched: { email: true },
    });
    expect(result.touched.email).toBe(true);
    expect(result.touched.firstName).toBe(false);
    expect(result.touched.lastName).toBe(false);
    expect(result.touched.date).toBe(true);
  });
  it("should handle SUBMIT_FORM", () => {
    const initialState = new FormState();
    const result = formReducer(initialState, {
      type: FormActionType.SUBMIT_FORM,
    });
    expect(result.isSubmitting).toBe(true);
    expect(result.touched.email).toBe(true);
    expect(result.touched.firstName).toBe(true);
    expect(result.touched.lastName).toBe(true);
    expect(result.touched.date).toBe(true);
  });
  it("should handle SUBMIT_FORM_SUCCESS", () => {
    const initialState = { ...new FormState(), isSubmitting: true };
    const result = formReducer(initialState, {
      type: FormActionType.SUBMIT_FORM_SUCCESS,
    });
    expect(result.isSubmitting).toBe(false);
  });
  it("should handle SUBMIT_FORM_FAILURE", () => {
    const initialState = { ...new FormState(), isSubmitting: true };
    const result = formReducer(initialState, {
      type: FormActionType.SUBMIT_FORM_FAILURE,
      message: FetchErrorMsg.CONNECTION_ERROR,
    });
    expect(result.isSubmitting).toBe(false);
    expect(result.submitError).toBe(FetchErrorMsg.CONNECTION_ERROR);
  });
  it("should handle CANCEL_SUBMIT", () => {
    const initialState = { ...new FormState(), isSubmitting: true };
    const result = formReducer(initialState, {
      type: FormActionType.CANCEL_SUBMIT,
    });
    expect(result.isSubmitting).toBe(false);
  });
});
