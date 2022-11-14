export default function middleware(request) {
  return Response.redirect(
    new URL(request.url.pathname.toLowerCase(), request.url)
  );
}
