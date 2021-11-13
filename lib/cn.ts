import { isNotNullOrUndefined } from './util';

type CNArg = string | undefined | null | Record<string, boolean>;

type CNArgs = CNArg;

export const cn = (...args: CNArgs[]) => {
  const cnList: string[] = [];

  for (const arg of args) {
    if (!isNotNullOrUndefined(arg)) {
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
  }

  return cnList.join(' ');
};
