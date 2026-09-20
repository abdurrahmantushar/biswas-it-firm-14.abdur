import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSourceRequests,
  updateRequestStatus,
} from "../../services/adminService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import RequestStatus from "../../components/requests/RequestsStatus";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const result = await getSourceRequests();

        const data = Array.isArray(result)
          ? result
          : result?.requests || [];

        setRequests(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load requests."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    if (!id) {
      toast.error("Request ID is missing.");
      return;
    }

    try {
      setUpdatingId(id);

      const result = await updateRequestStatus(id, status);

      const updatedRequest = result?.request || result;

      setRequests((previous) =>
        previous.map((request) => {
          const requestId = request._id || request.id;

          return requestId === id
            ? {
                ...request,
                ...updatedRequest,
                status,
              }
            : request;
        })
      );

      toast.success("Request status updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update request status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Request Management
          </h1>

          <p className="mt-2 text-slate-500">
            Review and manage source requests.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : !requests.length ? (
          <EmptyState message="No source requests found." />
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Request ID
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Product
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Update Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => {
                  const requestId = request._id || request.id;

                  return (
                    <tr
                      key={requestId}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900">
                        #{requestId}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {request.product?.name ||
                          request.productName ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {request.quantity || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {request.budget
                          ? `$${request.budget}`
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <RequestStatus status={request.status} />
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={request.status || "pending"}
                          onChange={(event) =>
                            handleStatusChange(
                              requestId,
                              event.target.value
                            )
                          }
                          disabled={updatingId === requestId}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="pending">
                            Pending
                          </option>
                          <option value="approved">
                            Approved
                          </option>
                          <option value="rejected">
                            Rejected
                          </option>
                          <option value="completed">
                            Completed
                          </option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminRequests;