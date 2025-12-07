# CineSeek — API Overview

CineSeek integrates with the MoviesDatabase API to fetch movie metadata (titles, genres, years, images, and pagination-ready lists). This README documents the API features, expected request/response formats, authentication, error handling, and best practices for use in the `alx-movie-app` project.

## Version

- Notes: I attempted to fetch the MoviesDatabase docs programmatically, but the public endpoint returned rate-limit / key errors. The MoviesDatabase API is published via RapidAPI (host: `moviesdatabase.p.rapidapi.com`). The explicit API version is not exposed in the responses I could retrieve; check the RapidAPI product page or your RapidAPI dashboard to find the authoritative version string for your account.

## Available Endpoints

- `GET /titles` — Main endpoint for fetching lists of movies. Supports query parameters for pagination and basic filters (e.g., `year`, `genre`).
- `GET /advanced-search` — (Optional) Endpoint for more complex queries and combinations of filters.
- `GET /titles/{id}` or `GET /title/{id}` — (If provided by the API) Fetch full details for a single title by id.

Note: Endpoint names and exact paths may vary slightly; confirm the exact paths on your RapidAPI product page.

## Request and Response Format

Typical request (server-side, to protect API key):

curl example

```
curl "https://moviesdatabase.p.rapidapi.com/titles?year=2020&genre=drama&page=1" \
  -H "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: moviesdatabase.p.rapidapi.com"
```

TypeScript (server-side) example using `fetch` in a Next.js API route:

```
const res = await fetch(
  `https://moviesdatabase.p.rapidapi.com/titles?year=${year}&genre=${genre}&page=${page}`,
  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  }
);
if (!res.ok) throw new Error(`API error: ${res.status}`);
const data = await res.json();
```

Typical response (example skeleton — actual fields may differ):

```
{
  "page": 1,
  "results": [
    {
      "id": "tt1234567",
      "title": "Example Movie",
      "year": 2020,
      "genres": ["Drama", "Thriller"],
      "image_url": "https://.../poster.jpg",
      "plot": "Short synopsis..."
    }
  ],
  "total_results": 1234,
  "total_pages": 62
}
```

In your TypeScript code, define interfaces in `interfaces/index.ts` that match the response structure (for example: `Movie`, `TitlesResponse`).

## Authentication

- The MoviesDatabase API on RapidAPI requires an API key. Send it in request headers (server-side) to avoid exposing it in client bundles.
- Typical required headers:
  - `X-RapidAPI-Key: <your_key>`
  - `X-RapidAPI-Host: moviesdatabase.p.rapidapi.com`
- Store your key in `.env.local` (do not commit this file). Example:

```
RAPIDAPI_KEY=your_rapidapi_key_here
```

In Next.js API routes use `process.env.RAPIDAPI_KEY` to sign requests.

## Error Handling

- Check HTTP status codes: handle `4xx` (client error), `5xx` (server error), and `429` (rate limit) specifically.
- Use try/catch around `fetch` calls and return meaningful error messages/status codes to the client.
- Example handling in server route:

```
try {
  const res = await fetch(...);
  if (res.status === 429) {
    return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
  }
  if (!res.ok) {
    return res.status(res.status).json({ message: 'Upstream API error' });
  }
  const data = await res.json();
  return res.status(200).json(data);
} catch (err) {
  return res.status(500).json({ message: 'Internal server error' });
}
```

Client-side considerations:
- Show a `Loading` component while requests are pending.
- Display user-friendly error messages when the server route returns an error.

## Usage Limits and Best Practices

- Rate limits: RapidAPI-hosted APIs typically enforce per-key rate limits. If you exceed them you will receive `429` responses — back off and retry with exponential backoff.
- Pagination: Always request paginated results rather than requesting large datasets in a single call.
- Caching: Cache results on the server (or use in-memory caching tools) where appropriate to reduce duplicate API calls.
- Protect keys: Never expose `RAPIDAPI_KEY` in client-side code. Use a Next.js API route (server-side) to proxy requests.
- Image optimization: Use Next.js `Image` component for poster images to improve performance.
- Type safety: Add TypeScript interfaces for the response objects and validate responses with type guards where necessary.

## Quick Checklist for This Project

- [ ] Add `interfaces/index.ts` with `Movie` and response interfaces.
- [ ] Implement server-side route `pages/api/fetch-movies.ts` which proxies requests to `/titles` and reads `process.env.RAPIDAPI_KEY`.
- [ ] Use `Loading` and `Error` components in `components/commons/`.
- [ ] Add `.env.local` with `RAPIDAPI_KEY` (do not commit it).

## Where to find authoritative docs

- RapidAPI product page for the MoviesDatabase API (search `moviesdatabase` on RapidAPI) — this contains endpoint details, parameters, example requests, and any versioning information specific to the product.

---

If you'd like, I can now generate `interfaces/index.ts` skeletons and a Next.js API route `pages/api/fetch-movies.ts` (server-side proxy) that uses `process.env.RAPIDAPI_KEY`. Would you like me to add those files now?
