import { MinLength, IsEmail, validateSync, IsDate } from "class-validator";
import { plainToClass } from "class-transformer";
import { FetchErrorMsg } from "../../errors";

export class FormValues {
  @MinLength(1, { message: "please enter your first name" })
  firstName: string = "";
  @MinLength(1, { message: "please enter your last name" })
  lastName: string = "";
  @IsEmail(
    {},
    { message: "please enter email in valid format (ex. user@example.com)" },
  )
  @MinLength(1, { message: "please enter your email" })
  email: string = "";
  @IsDate({ message: "please enter valid date" })
  date: Date = new Date();
}

export class FormErrors {
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  date: string | null = null;
}

export const validateFormValues = (
  values: FormValues,
  prevErrors: FormErrors = new FormErrors(),
): FormErrors => {
  const errors = validateSync(plainToClass(FormValues, values));
  return errors.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.property]: Object.values(curr.constraints)[0],
    }),
    prevErrors,
  );
};

export const hasFormError = (errors: FormErrors) =>
  Object.values(errors).reduce((prev, curr) => prev || curr !== null, false);

export class FormTouched {
  firstName: boolean = false;
  lastName: boolean = false;
  email: boolean = false;
  date: boolean = true;
}

export const setAllTouchedToTrue = (): FormTouched =>
  Object.keys(new FormTouched()).reduce(
    (p, c) => ({ ...p, [c]: true }),
    new FormTouched(),
  );

export class FormState {
  values: FormValues = new FormValues();
  errors: FormErrors = validateFormValues(new FormValues());
  touched: FormTouched = new FormTouched();
  isSubmitting: boolean = false;
  submitError: FetchErrorMsg | null = null;
}
