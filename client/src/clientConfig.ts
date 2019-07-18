import { DefaultApi } from "./generated";

const apiURL =
  process.env.NODE_ENV === "production"
    ? "http://46.101.246.218:4000/api"
    : "http://localhost:4000";

export const createApiClient = () => new DefaultApi({ basePath: apiURL });
