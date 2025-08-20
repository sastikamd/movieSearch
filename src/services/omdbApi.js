const API_URL = 'https://www.omdbapi.com/';
const apiKey = import.meta.env.VITE_OMDB_KEY;

async function fetchFromOmdb(paramsObj) {
  const params = new URLSearchParams({ apiKey, ...paramsObj });
  const res = await fetch(`${API_URL}?${params}`);
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error);
  return data;
}

export async function searchMovies({ query, page = 1, type = '' }) {
  return fetchFromOmdb({ s: query.trim(), page, type });
}

export async function getMovieDetails(imdbID) {
  return fetchFromOmdb({ i: imdbID, plot: 'full' });
}

