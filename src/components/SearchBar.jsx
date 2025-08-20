import { useState, useEffect } from 'react';

export default function SearchBar({ value = '', onSearch }) {
  const [term, setTerm] = useState(value);

  useEffect(() => {
    setTerm(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-grow px-3 py-2 border rounded-md focus:outline-none"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
    </form>
  );
}
