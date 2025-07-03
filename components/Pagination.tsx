type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ total, perPage, currentPage, onPageChange }: Props) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="flex justify-center mt-6 gap-2">
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md border ${
            i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
