type CNArg = undefined | null | string | Record<string, boolean>;

type CNArgs = CNArg | CNArg[];

export const cn = (...args: CNArgs[]) => {
  let cnList: string[] = [];
  for (const arg of args) {
    if (arg === null || arg === undefined) {
      continue;
    }

    if (typeof arg === 'string') {
      cnList.push(arg);
    }

    if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          cnList.push(key);
        }
      }
    }

    if (Array.isArray(arg)) {
      cnList.push(cn(...arg));
    }
  }

  return cnList.join(' ');
};
