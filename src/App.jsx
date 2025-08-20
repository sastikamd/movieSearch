import { Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
