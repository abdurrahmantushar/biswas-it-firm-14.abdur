const DiscoveryContext = ({
  search,
  category,
  location,
  sourceType,
}) => {
  if (!search && !category && !location && !sourceType) {
    return null;
  }

  const contexts = [
    {
      label: "Search",
      value: search || "All Products",
    },
    {
      label: "Category",
      value: category || "All Categories",
    },
    {
      label: "Location",
      value: location || "All Locations",
    },
    {
      label: "Source Type",
      value: sourceType || "All Sources",
    },
  ];

  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Current Discovery
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your current search and filter preferences
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contexts.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {item.label}
            </p>

            <p className="mt-2 truncate text-base font-semibold capitalize text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoveryContext;