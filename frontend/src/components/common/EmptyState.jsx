
const EmptyState = ({ message = "No data found." }) => {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">
        —
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        Nothing Here
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;