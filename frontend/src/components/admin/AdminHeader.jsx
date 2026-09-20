
const AdminHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-2 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Admin Panel
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage Source-X platform activities.
        </p>
      </div>

      <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
        Administrator
      </div>
    </div>
  );
};

export default AdminHeader;