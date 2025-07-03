'use client';

import { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import CandidateModal from '../components/CandidateModal';
import Pagination from '../components/Pagination';
import { Candidate } from '../types/types';

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const sheetID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

  useEffect(() => {
    const fetchCandidates = async () => {32
      const res = await fetch(sheetURL);
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));

      const rows = json.table.rows.map((row: any): Candidate => ({
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

  const startIndex = (currentPage - 1) * perPage;
  const paginated = filtered.slice(startIndex, startIndex + perPage);

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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {paginated.map((c, idx) => (
          <CandidateCard key={idx} candidate={c} onClick={() => setSelected(c)} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        total={filtered.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {selected && <CandidateModal selected={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
