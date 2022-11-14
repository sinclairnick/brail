export default function middleware(request) {
  const url = new URL(request.url);

  return Response.redirect(new URL(url.pathname.toLowerCase(), request.url));
}
