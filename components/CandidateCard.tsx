import { Candidate } from '../types/types';

type Props = {
  candidate: Candidate;
  onClick: () => void;
};

export default function CandidateCard({ candidate, onClick }: Props) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      <img
        src={candidate.image || '/placeholder.png'}
        alt={candidate.fullName}
        className="w-full h-fit object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{candidate.fullName}</h2>
        <p className="text-xs text-gray-500 mt-1">Qualifications: {candidate.qualifications}</p>
        <p className="text-xs text-gray-500 mt-1">Profession: {candidate.profession}</p>
        <p className="text-xs text-gray-500 mt-1">Skills: {candidate.skills}</p>
        <p className="text-xs text-gray-500 mt-1">Telephone: {candidate.telephone}</p>
        <p className="text-xs text-gray-500 mt-1">Email: {candidate.email}</p>
      </div>
    </div>
  );
}
