const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-900"
      />

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;