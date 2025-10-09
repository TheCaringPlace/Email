import { createMiddleware } from "hono/factory";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { sendProblem } from "../exceptions/responses";

export const errorWrapper = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (error) {
    return sendProblem(
      c,
      error as Error & {
        code?: ContentfulStatusCode;
        headers?: Record<string, string>;
      },
    );
  }
});
