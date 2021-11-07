export const tap =
  <T>(callback: (value: T) => void) =>
  (value: T) => {
    callback(value);
    return value;
  };

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
