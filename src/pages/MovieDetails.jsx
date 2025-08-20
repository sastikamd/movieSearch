import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/omdbApi.js';

export default function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieDetails(imdbID)
      .then(setMovie)
      .catch((err) => setError(err.message));
  }, [imdbID]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!movie) return <p className="p-4 flex items-center justify-center">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/vite.svg'}
          alt={movie.Title}
          className="w-64 h-auto self-start"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="mb-1">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="mb-1">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="mb-1">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p className="mb-1">
            <strong>Cast:</strong> {movie.Actors}
          </p>
          <p className="mb-1">
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <p className="mt-4">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
