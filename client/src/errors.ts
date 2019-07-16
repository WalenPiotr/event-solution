export enum FetchErrorMsg {
  CONNECTION_ERROR = "CONNECTION_ERROR",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
}

export const mapErrorToMessage = (err: any): FetchErrorMsg => {
  let message = FetchErrorMsg.CONNECTION_ERROR;
  if (err.status && err.status === 409) {
    message = FetchErrorMsg.ALREADY_EXISTS;
  }
  if (err.status && err.status === 400) {
    message = FetchErrorMsg.INVALID_ARGUMENT;
  }
  if (err.status && err.status === 500) {
    message = FetchErrorMsg.INTERNAL_ERROR;
  }
  return message;
};
