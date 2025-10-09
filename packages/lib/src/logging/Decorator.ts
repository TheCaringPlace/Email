// biome-ignore-all lint/suspicious/noExplicitAny: Need to support any for the decorator
import { rootLogger } from "./Logger";

const OBJ_KEYS_TO_TRACE = ["message", "id", "type", "project"];
const TRUNCATE_LENGTH = 256;
const ELLIPSIS = "...";

export type LogMethodOptions = {
  context?: Record<string, any>;
  methodName?: string;
};

function createArgsArray(args: any[]) {
  return args
    .map((arg) => {
      if (typeof arg === "undefined") {
        return "undefined";
      }
      if (arg === null) {
        return "null";
      }
      if (typeof arg === "function") {
        return `function ${arg.name}()`;
      }
      if (typeof arg === "undefined") {
        return "undefined";
      }
      if (arg instanceof Blob) {
        return {
          Blob: {
            size: arg.size,
            type: arg.type,
          },
        };
      }

      if (typeof arg === "string") {
        return arg.length > TRUNCATE_LENGTH ? `${arg.slice(0, TRUNCATE_LENGTH - ELLIPSIS.length)}${ELLIPSIS}` : arg;
      }
      if (typeof arg === "object") {
        const type = arg.constructor?.name ?? "Object";
        const loggable = Object.entries(arg)
          .filter(([key]) => OBJ_KEYS_TO_TRACE.includes(key))
          .map(([key, value]) => ({
            [key]: value ?? "undefined",
          }));
        if (Object.keys(loggable).length > 0) {
          return `${type}: ${JSON.stringify(loggable)}`;
        }
        return `${type}: ${arg.toString()}`;
      }
      return arg;
    })
    .join(", ");
}

function getLogger(module: string, methodName: string, args: any[], options?: LogMethodOptions) {
  const logger = rootLogger.child({
    method: {
      name: methodName,
      module,
      args: createArgsArray(args),
    },
    ...options?.context,
  });

  return logger;
}

export function withLogger<TArgs extends any[], TReturn>(fn: (...args: TArgs) => TReturn, module: string, options?: LogMethodOptions) {
  const methodName = options?.methodName ?? String(fn.name);
  return (...args: TArgs) => {
    const logger = getLogger(module, methodName, args, options);
    try {
      const result = fn(...args);
      logger.info({ result }, `${methodName}.succeeded`);
      return result;
    } catch (error) {
      logger.warn({ error }, `${methodName}.failed`);
      throw error;
    }
  };
}

export function withPromiseLogger<TArgs extends any[], TReturn extends Promise<any>>(fn: (...args: TArgs) => TReturn, module: string, options?: LogMethodOptions) {
  const methodName = options?.methodName ?? String(fn.name);

  return async (...args: TArgs) => {
    const logger = getLogger(module, methodName, args, options);
    try {
      const result = await fn(...args);
      logger.info({ result }, `${methodName}.succeeded`);
      return result;
    } catch (error) {
      logger.warn({ error }, `${methodName}.failed`);
      throw error;
    }
  };
}

export function logMethodReturningPromise<TReturn, TFunctionParameters>(className: string, options: LogMethodOptions = {}) {
  return (target: any, context: ClassMethodDecoratorContext | ClassGetterDecoratorContext | string): TypedPropertyDescriptor<(params: TFunctionParameters) => Promise<TReturn>> => {
    const methodName = String(typeof context === "string" ? context : context.name);

    function replacementMethod(this: any, ...args: any[]) {
      const logger = getLogger(className, methodName, args, options);
      const start = Date.now();
      const _timer = logger.info(`${methodName}.start`);
      const result = target.call(this, ...args);

      return new Promise<TReturn>((resolve, reject) => {
        result
          .then((value: TReturn) => {
            logger.info({ duration: Date.now() - start }, `${methodName}.succeeded`);
            resolve(value);
          })
          .catch((error: unknown) => {
            logger.warn({ duration: Date.now() - start, error }, `${methodName}.failed`);
            reject(error);
          });
      });
    }
    return replacementMethod as TypedPropertyDescriptor<(params: TFunctionParameters) => Promise<TReturn>>;
  };
}

/**
 * Decorator to time a method and log the result.
 * @param className - The name of the class the method belongs to.
 * @param options - Options for the timer.
 * @returns A decorator that times the method and logs the result.
 */
export function logMethod(module: string, options?: LogMethodOptions) {
  return (target: any, context: ClassMethodDecoratorContext | ClassGetterDecoratorContext) => {
    const methodName = options?.methodName ?? String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      const logger = getLogger(module, methodName, args, options);
      try {
        const result = target.call(this, ...args);
        logger.info({ result }, "Method executed successfully");
        return result;
      } catch (error) {
        logger.error({ error }, "Method executed with error");
        throw error;
      }
    }
    return replacementMethod;
  };
}
