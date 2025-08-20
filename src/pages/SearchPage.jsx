import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import FilterDropdown from '../components/FilterDropdown.jsx';
import MovieCard from '../components/MovieCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { searchMovies } from '../services/omdbApi.js';

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || 'marvel';
  const initialPage = parseInt(params.get('page')) || 1;
  const initialType = params.get('type') || '';

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [type, setType] = useState(initialType);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(totalResults / 10);

  // Sync URL query params with state
  function updateSearchParams({ q, p, t }) {
    const newParams = new URLSearchParams(location.search);
    if (q !== undefined) newParams.set('q', q);
    if (p !== undefined) newParams.set('page', p);
    if (t !== undefined) newParams.set('type', t);
    navigate({ pathname: '/', search: newParams.toString() }, { replace: true });
  }

  // Fetch movies when query, page, or type changes
  useEffect(() => {
    if (!query) return;
    setLoading(true);            // Show loading when fetch starts
    setError(null);

    searchMovies({ query, page, type })
      .then((data) => {
        setResults(data.Search);
        setTotalResults(+data.totalResults);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));  // Hide loading when fetch ends

    // Update URL params with current state
    updateSearchParams({ q: query, p: page, t: type });
  }, [query, page, type]);

  // Handlers update state and pagination
  const handleSearch = (term) => {
    setQuery(term);
    setPage(1);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);   // This triggers useEffect and loading spinner
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 justify-center">
        <SearchBar value={query} onSearch={handleSearch} />
        <FilterDropdown value={type} onChange={handleTypeChange} />
      </header>

   
      {loading && <p className="text-center flex items-center justify-center">Loading…</p>}

    
      {error && <p className="text-center text-red-500">{error}</p>}

   
      {!loading && !error && results?.length === 0 && query && (
        <p className="text-center">No results found.</p>
      )}

 
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </section>

    
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      )}
    </div>
  );
}
