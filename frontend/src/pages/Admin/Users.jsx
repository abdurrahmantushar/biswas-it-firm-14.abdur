
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await getUsers();

        const data = Array.isArray(result)
          ? result
          : result?.users || [];

        setUsers(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load users."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            User Management
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage registered Source-X users.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : !users.length ? (
          <EmptyState message="No users found." />
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {user.name || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.email || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm capitalize text-slate-600">
                      {user.role || "Buyer"}
                    </td>

                    <td className="px-6 py-4 text-sm capitalize text-slate-600">
                      {user.status || "Active"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Users;