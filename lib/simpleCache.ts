export const simpleCache = <T>() => {
  const map = new Map<string | number, { value: T; ttl: number }>();

  // 1 Minute cache
  const TTL = 1000 * 10;

  const get = (key: string | number) => {
    const item = map.get(key);
    if (!item) {
      return;
    }

    if (item.ttl < Date.now()) {
      map.delete(key);
      return;
    }

    return item.value;
  };

  const set = (key: string | number, value: T) => {
    return map.set(key, { value, ttl: Date.now() + TTL });
  };

  const clear = () => {
    return map.clear();
  };

  return {
    get,
    set,
    clear,
  };
};
