export const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (v, i) => i + start);
};

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

export const getRandomInRange = (min: number, max: number) => {
  const v = Math.random();

  return v * (max - min) + min;
};
