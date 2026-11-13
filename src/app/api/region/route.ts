// Tells the video player which country and state the visitor is in, so it can pick a caption language.
// Vercel adds these headers from the visitor's internet connection. Only the codes are returned; nothing is stored.
// On a local computer the headers are missing, so both values come back empty.

export function GET(request: Request) {
  return Response.json(
    {
      country: request.headers.get("x-vercel-ip-country") ?? "",
      region: request.headers.get("x-vercel-ip-country-region") ?? "",
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
