import pino from "pino";
import pinoPretty from "pino-pretty";
import { getRequestInfo } from "./RequestInfo";

const { LOG_LEVEL, LOG_PRETTY } = process.env;

const stream = LOG_PRETTY
  ? pinoPretty({
      levelFirst: true,
      colorize: true,
    })
  : process.stdout;

const createLogger = () =>
  pino(
    {
      level: LOG_LEVEL ?? "debug",
      mixin: () => {
        const requestInfo = getRequestInfo();
        return {
          reqId: requestInfo.requestId,
        };
      },
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
    },
    stream,
  );

export const rootLogger = createLogger();
