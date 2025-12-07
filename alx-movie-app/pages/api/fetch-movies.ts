import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (request: NextApiRequest, response: NextApiResponse)  {
  if (request.method === "POST") {
    const { year, page, genre } = request.body as { year?: string | number; page?: number; genre?: string };
    const date = new Date();
    const effectiveYear = year || date.getFullYear();
    const url = `https://moviesdatabase.p.rapidapi.com/titles?year=${effectiveYear}&sort=year.decr&limit=12&page=${page ?? 1}${genre ? `&genre=${encodeURIComponent(genre)}` : ""}`;

    const resp = await fetch(url, {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`,
      },
    });

    if (!resp.ok) {
      return response.status(resp.status).json({ message: "Failed to fetch movies" });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results;

    return response.status(200).json({ movies });
  } else {
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed in here`);
  }
};
