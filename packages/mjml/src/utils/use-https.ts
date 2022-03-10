export function useHttps(url: any) {
  if (url) {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
  }
  return url;
}
