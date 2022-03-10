export function addQueryParams(url: any, params: any) {
  const query = Object.keys(params)
    .reduce((acc, curr) => {
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      return acc.concat(`${curr}=${encodeURIComponent(params[curr])}`);
    }, [])
    .join('&');
  if (url.indexOf('?') !== -1) {
    return `${url}&${query}`;
  }
  return `${url}?${query}`;
}
