export enum FetchErrorMsg {
  UNEXPECTED = "UNEXPECTED",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
}

export const mapErrorToMessage = (err: any): FetchErrorMsg => {
  let message = FetchErrorMsg.UNEXPECTED;
  if (err.status && err.status === 409) {
    message = FetchErrorMsg.ALREADY_EXISTS;
  }
  if (err.status && err.status === 400) {
    message = FetchErrorMsg.INVALID_ARGUMENT;
  }
  if (err.status && err.status === 500) {
    message = FetchErrorMsg.CONNECTION_ERROR;
  }
  return message;
};
