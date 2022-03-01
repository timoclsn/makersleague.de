export const colorMap = {
  blue: {
    text: 'text-dark',
    bg: 'bg-blue',
  },
  'blue-accent': {
    text: 'text-light',
    bg: 'bg-blue-accent',
  },
  pink: {
    text: 'text-light',
    bg: 'bg-pink',
  },
  green: {
    text: 'text-light',
    bg: 'bg-green',
  },
  sand: {
    text: 'text-dark',
    bg: 'bg-sand',
  },
} as const;

export const toKebabCase = (str: string) =>
  str
    .match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    )!
    .map((x) => x.toLowerCase())
    .join('-');
