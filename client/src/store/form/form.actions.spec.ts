import { setTouched, setValues, submitForm } from "./form.actions";
import { FormTouched, FormValues } from "./form.state";
import { FormActionType } from "./form.types";

describe("form actions", () => {
  describe("setValues", () => {
    it("should set form values", () => {
      const values: Partial<FormValues> = {
        firstName: "first",
      };
      const expected = {
        type: FormActionType.SET_VALUES,
        values,
      };
      const result = setValues(values);
      expect(result).toEqual(expected);
    });
  });
  describe("setTouched", () => {
    it("should set form touched", () => {
      const touched: Partial<FormTouched> = {
        firstName: true,
        lastName: false,
      };
      const expected = {
        type: FormActionType.SET_TOUCHED,
        touched,
      };
      const result = setTouched(touched);
      expect(result).toEqual(expected);
    });
  });
  describe("submitForm", () => {
    it("should return submit action", () => {
      const expected = {
        type: FormActionType.SUBMIT_FORM,
      };
      const result = submitForm();
      expect(result).toEqual(expected);
    });
  });
});
