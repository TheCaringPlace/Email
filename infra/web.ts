import { api } from "./api";

export const dashboard = new sst.aws.Nextjs("Dashboard", {
  path: "packages/dashboard",
  environment: {
    NEXT_PUBLIC_API_URI: api.url,
  },
});