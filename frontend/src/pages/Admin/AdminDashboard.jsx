
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAdminStats } from "../../services/adminService";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const result = await getAdminStats();

        const data = result?.stats || result;

        setStats({
          totalUsers: data?.totalUsers || 0,
          totalProducts: data?.totalProducts || 0,
          totalRequests: data?.totalRequests || 0,
          pendingRequests: data?.pendingRequests || 0,
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load admin statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
    },
    {
      title: "Total Requests",
      value: stats.totalRequests,
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
    },
  ];

return (
  <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <AdminSidebar />

        <div>
          <AdminHeader/>
          {loading ? (
            <p className="text-slate-500">
              Loading statistics...
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {statCards.map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Admin Overview
            </h2>

            <p className="mt-2 text-slate-500">
              Use the admin management sections to review users,
              products and source requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
);
};

export default AdminDashboard;