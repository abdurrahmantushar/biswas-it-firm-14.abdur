import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getBuyerDashboard,
} from "../../services/userService";
import { getMyRequests } from "../../services/requestService";
import Loader from "../../components/common/Loader";
import RequestStatus from "../../components/requests/RequestsStatus";

const BuyerDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    savedProducts: 0,
    completedRequests: 0,
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getBuyerDashboard();
        const data = result?.stats || result;

        setStats({
          totalRequests: data?.totalRequests || 0,
          pendingRequests: data?.pendingRequests || 0,
          savedProducts: data?.savedProducts || 0,
          completedRequests: data?.completedRequests || 0,
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const result = await getMyRequests();

        const data = Array.isArray(result)
          ? result
          : result?.requests || [];

        setRequests(data.slice(0, 5));
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load recent requests."
        );
      } finally {
        setRequestsLoading(false);
      }
    };

    loadRequests();
  }, []);

  const statCards = [
    {
      title: "Total Requests",
      value: stats.totalRequests,
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
    },
    {
      title: "Saved Products",
      value: stats.savedProducts,
    },
    {
      title: "Completed Requests",
      value: stats.completedRequests,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Buyer Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your products, saved sources and requests.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Quick Actions
            </h2>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/discovery"
                className="rounded-lg bg-slate-900 px-5 py-3 text-center font-medium text-white"
              >
                Discover Products
              </Link>

              <Link
                to="/requests/create"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center font-medium text-slate-700"
              >
                Create Source Request
              </Link>

              <Link
                to="/buyer/saved-products"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center font-medium text-slate-700"
              >
                View Saved Products
              </Link>

              <Link
                to="/buyer/profile"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center font-medium text-slate-700"
              >
                Manage Profile
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Requests
              </h2>

              <Link
                to="/requests"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                View All
              </Link>
            </div>

            <div className="mt-5">
              {requestsLoading ? (
                <p className="text-slate-500">
                  Loading requests...
                </p>
              ) : !requests.length ? (
                <div className="rounded-lg bg-slate-50 p-5 text-center text-slate-500">
                  No recent requests.
                </div>
              ) : (
                <div className="space-y-3">
                {requests.map((request) => {
                  const requestId = request?._id || request?.id;

                  return (
                    <Link
                      key={requestId}
                      to={`/requests/${requestId}`}
                      className="block rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-slate-900">
                            {request.product?.name ||
                              request.productName ||
                              `Request #${requestId}`}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Quantity: {request.quantity || "N/A"}
                          </p>
                        </div>

                        <RequestStatus status={request.status} />
                      </div>
                    </Link>
                  );
                })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;