import { MinLength, IsEmail, validateSync, IsDate } from "class-validator";
import { plainToClass } from "class-transformer";

export class FormValues {
  @MinLength(1, { message: "please enter your first name" })
  firstName: string = "";
  @MinLength(1, { message: "please enter your last name" })
  lastName: string = "";
  @IsEmail(
    {},
    { message: "please enter email in valid format (ex. user@example.com)" },
  )
  @MinLength(1)
  email: string = "";
  @IsDate({ message: "please enter valid date" })
  date: Date = new Date();
  [key: string]: string | Date;
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

export class FormErrors {
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  date: string | null = null;
  [key: string]: string | null;
}

export class FormTouched {
  firstName: boolean = false;
  lastName: boolean = false;
  email: boolean = false;
  date: boolean = true;
  [key: string]: boolean;
}

export class FormState {
  values: FormValues = new FormValues();
  errors: FormErrors = validateFormValues(new FormValues());
  touched: FormTouched = new FormTouched();
  isSubmitting: boolean = false;
  submitError: string | null = null;
}
