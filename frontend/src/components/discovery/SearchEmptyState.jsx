
const SearchEmptyState = ({
  message = "No products found.",
}) => {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">
        No Results Found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default SearchEmptyState;