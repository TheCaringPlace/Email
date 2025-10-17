
export const passEnvironmentVariables = (keys: string[]) => {
  return Object.fromEntries(
    keys
      .filter((key) => process.env[key] !== undefined && process.env[key] !== "" && process.env[key] !== null)
      .map((key) => [key, process.env[key] as string])
  );
};
