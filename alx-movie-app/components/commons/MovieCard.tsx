import React from 'react';

interface Movie {
  id?: string;
  title?: string;
  year?: number;
  genres?: string[];
  image?: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <article className="border rounded overflow-hidden shadow-sm bg-white">
      {movie.image ? (
        // Keep simple img to avoid requiring Next.js Image config here
        <img src={movie.image} alt={movie.title} className="w-full h-56 object-cover" />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">No image</div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.year ?? '—'}</p>
        {movie.genres && <p className="text-sm mt-2 text-gray-500">{movie.genres.join(', ')}</p>}
      </div>
    </article>
  );
};

export default MovieCard;
