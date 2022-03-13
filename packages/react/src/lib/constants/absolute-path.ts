export const checkIsAbsoluteUrl = (url: string) => {
  return /^https?/.test(url);
};
