import { DefaultApi } from "./generated";

const apiURL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:4000";

export const createApiClient = () => new DefaultApi({ basePath: apiURL });
