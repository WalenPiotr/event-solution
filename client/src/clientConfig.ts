import { DefaultApi } from "./generated";

export const createApiClient = () =>
  new DefaultApi({ basePath: "http://localhost:4000" });
