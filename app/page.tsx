'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const sheetURL = 'https://docs.google.com/spreadsheets/d/1GsgzjTnQjM_a7eF1ZCVExkZDu7dKiO18c1fCrfJY38U/gviz/tq?tqx=out:json';

  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await fetch(sheetURL);
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const rows = json.table.rows.map((row) => ({
        image: row.c[0]?.v || '',
        fullName: row.c[1]?.v || '',
        qualifications: row.c[2]?.v || '',
        profession: row.c[3]?.v || '',
        skills: row.c[4]?.v || '',
        telephone: row.c[5]?.v || '',
        email: row.c[6]?.v || '',
      }));
      setCandidates(rows);
    };

    fetchCandidates();
  }, []);

  const filtered = candidates.filter((c) =>
    `${c.fullName} ${c.profession} ${c.skills}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SESDAC YAMM Directory</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name, profession or skills..."
          className="w-full px-4 py-2 border rounded-md shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((c, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelected(c)}
          >
            <img
  src={c.image || '/placeholder.png'}
  alt={c.fullName}
  className="w-full h-fit object-cover "
/>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{c.fullName}</h2>
              <p className="text-xs text-gray-500 mt-1">Qualifications: {c.qualifications}</p>
              <p className="text-xs text-gray-500 mt-1">Profession : {c.profession}</p>
              <p className="text-xs text-gray-500 mt-1">Skills: {c.skills}</p>
              <p className="text-xs text-gray-500 mt-1">Telephone: {c.telephone}</p>
              <p className="text-xs text-gray-500 mt-1">Email: {c.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <img
  src={selected.image || '/placeholder.png'}
  alt={selected.fullName}
  className="w-full h-56 object-cover rounded-md mb-4"
/>
            <h2 className="text-2xl font-bold">{selected.fullName}</h2>
            <p className="mt-2 text-sm text-gray-700">
              <strong>Qualifications:</strong> {selected.qualifications}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Profession:</strong> {selected.profession}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Contact:</strong> {selected.telephone}, {selected.email}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Skills:</strong> {selected.skills}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
