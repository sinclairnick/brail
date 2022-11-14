export default function middleware(request) {
  if (request.url.match(/\/[A-Z]/)) {
    const url = new URL(request.url);
    url.pathname = url.pathname.toLowerCase();
    return Response.redirect(url);
  }
}
