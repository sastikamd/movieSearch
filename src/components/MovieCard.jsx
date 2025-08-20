import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const { Poster, Title, Year, imdbID } = movie;
  return (
    <Link
      to={`/movie/${imdbID}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={Poster !== 'N/A' ? Poster : '/vite.svg'}
        alt={Title}
        className="w-full h-60 object-cover"
      />
      <div className="p-2">
        <h3 className="font-medium truncate">{Title}</h3>
        <p className="text-sm text-gray-600">{Year}</p>
      </div>
    </Link>
  );
}
