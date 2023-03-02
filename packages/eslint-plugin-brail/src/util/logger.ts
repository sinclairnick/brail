export const logger: Pick<typeof console, "log" | "debug" | "warn" | "error"> =
  process.env.BRAIL_ESLINT_LOG === "true"
    ? {
        log: console.log,
        debug: console.debug,
        warn: console.warn,
        error: console.error,
      }
    : {
        log: () => {},
        debug: () => {},
        warn: () => {},
        error: () => {},
      };
