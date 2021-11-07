export const fetchJson = <T>(...args: Parameters<typeof fetch>) => {
  return fetch(...args).then((r) => r.json() as Promise<T>);
};
