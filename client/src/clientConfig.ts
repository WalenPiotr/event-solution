import { DefaultApi } from "./generated";

const apiURL =
  process.env.NODE_ENV === "production"
    ? "http://production-server:1234"
    : "http://localhost:4000";

export const createApiClient = () => new DefaultApi({ basePath: apiURL });
