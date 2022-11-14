# Using Images

In traditional email templating, hosting images was a common obstacle to a smooth email pipeline. Since someone's email inbox can't reach your local filesystem, each image had to be manually uploaded somewhere.

NextJS and Vercel automatically host any local images on their servers, meaning you can easily use local and remote images using Brail. However, **we must ensure every image `src` is an absolute URL**.

The `<Image/>` and `<Link/>` elements from the `@brail/react` package both error if they are passed `src` or `href` urls that are not absolute. This is done to avoid images appearing in previews, while disappearing when actually sent via email when the relative file is no longer to be found.

### How do I get the absolute URL?

The following is a snippet taken from the `apps/example` project, which makes it simpler to get absolute URLs from relative file paths.

```tsx
export const HOSTNAME = VERCEL_ENV
  ? `https://${VERCEL_ENV}`
  : 'http://localhost:4444'; // Port specified in package.json dev script

export const getAbsoluteSrc = (src: string) => {
  return src.startsWith('/') ? `${HOSTNAME}${src}` : src;
};
```
