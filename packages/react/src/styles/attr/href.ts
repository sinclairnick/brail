class AbsoluteUrlError extends Error {
  constructor(url: string) {
    super(
      `Found relative url: ${url}.\n` +
        `All urls must be absolute. For example, use https://example.com instead of /example.\n` +
        `Any relative URLs will break when the email is viewed in a web browser or email client.\n`
    );
  }
}

export const isAbsoluteUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  }

  return false;
};

export const ensureAbsoluteUrl = (
  baseUrl: string | undefined,
  url: string,
  skipValidation = false
) => {
  if (url.startsWith("{{") && url.endsWith("}}")) return url;

  if (isAbsoluteUrl(url)) {
    return url;
  }
  if (baseUrl) {
    return url.startsWith("/") ? baseUrl + url : baseUrl + "/" + url;
  }

  if (!skipValidation) {
    throw new AbsoluteUrlError(url);
  }

  return url;
};
