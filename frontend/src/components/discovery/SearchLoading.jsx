const SearchLoading = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <div className="aspect-[4/3] animate-pulse bg-slate-200" />

          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />

            <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchLoading;