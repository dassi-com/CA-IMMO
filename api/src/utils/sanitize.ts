export const sanitizeText = (value: string): string => {
  return value
    .replace(/[<>]/g, "")           // Strip < and > to prevent HTML/script injection
    .trim();
};

export const sanitizeOptional = (value?: string): string | undefined => {
  return value ? sanitizeText(value) : undefined;
};
