const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;

export const HOSTNAME = VERCEL_ENV
  ? `https://${VERCEL_ENV}`
  : 'http://localhost:4444'; // Port specified in package.json dev script
