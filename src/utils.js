export const capitalize = s =>
  s[0].toUpperCase() + s.slice(1);

export const chunksOf = (n, xs) =>
  xs.reduce((acc, x) => {
    const i = acc.length - 1;
    const last = acc[i];

    return !last || last.length === n
      ? [...acc, [x]]
      : [...acc.slice(0, i), [...last, x]];
  }, []);

export const sample = xs =>
  xs[Math.floor(Math.random() * xs.length)];
