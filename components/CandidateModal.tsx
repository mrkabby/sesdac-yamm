'use client';
import Image from 'next/image';
import { Candidate } from '@/types/types';

type Props = {
  selected: Candidate;
  onClose: () => void;
};

export default function CandidateModal({ selected, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative w-full h-56 mb-4">
          <Image
            src={selected.image || '/placeholder.png'}
            alt={selected.fullName}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
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
  );
}
