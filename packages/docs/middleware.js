export default function middleware(request) {
  return Response.redirect(new URL(url.pathname.toLowerCase(), request.url));
}
