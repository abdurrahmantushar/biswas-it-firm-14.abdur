import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getSourceRequests,
  updateRequestStatus,
  createOrderFromRequest,
} from "../../services/adminService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import RequestStatus from "../../components/requests/RequestsStatus";

const AdminRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 3,
    totalRequests: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [orderForm, setOrderForm] = useState({
    priority: "medium",
    deadline: "",
    internalNote: "",
  });

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);

        const result = await getSourceRequests(currentPage, 3);

        const data = Array.isArray(result)
          ? result
          : result?.requests || [];

        setRequests(data);

        if (result?.pagination) {
          setPagination(result.pagination);
        }
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
  }, [currentPage]);

  const handlePrevious = () => {
    if (pagination.hasPreviousPage) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  };

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

  const handleOpenOrderModal = (request) => {
    setSelectedRequest(request);
    setOrderForm({
      priority: "medium",
      deadline: "",
      internalNote: "",
    });
  };

  const handleCloseOrderModal = () => {
    if (creatingOrder) return;

    setSelectedRequest(null);
    setOrderForm({
      priority: "medium",
      deadline: "",
      internalNote: "",
    });
  };

  const handleCreateOrder = async (event) => {
    event.preventDefault();

    if (!selectedRequest?._id) {
      toast.error("Request ID is missing.");
      return;
    }

    if (!orderForm.deadline) {
      toast.error("Please select an order deadline.");
      return;
    }

    try {
      setCreatingOrder(true);

      const result = await createOrderFromRequest({
        requestId: selectedRequest._id,
        priority: orderForm.priority,
        deadline: orderForm.deadline,
        internalNote: orderForm.internalNote.trim(),
      });

      toast.success(
        result?.message || "Order created successfully."
      );

      setRequests((previous) =>
        previous.map((request) =>
          request._id === selectedRequest._id
            ? {
                ...request,
                status: "completed",
              }
            : request
        )
      );

      setSelectedRequest(null);
      setOrderForm({
        priority: "medium",
        deadline: "",
        internalNote: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create order."
      );
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          ← Back
        </button>

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
          <>
            <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
              <table className="w-full min-w-[1150px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Request ID
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Buyer
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

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Order
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
                          <p className="font-medium text-slate-900">
                            {request.buyer?.name || "N/A"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {request.buyer?.email || "N/A"}
                          </p>

                          <p className="mt-1 break-all text-xs text-slate-400">
                            ID: {request.buyer?._id || "N/A"}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <p className="font-medium text-slate-900">
                            {request.product?.name ||
                              request.productName ||
                              "N/A"}
                          </p>

                          {request.product?._id && (
                            <p className="mt-1 break-all text-xs text-slate-400">
                              ID: {request.product._id}
                            </p>
                          )}
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

                        <td className="px-6 py-4">
                          {request.status === "approved" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenOrderModal(request)
                              }
                              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                              Create Order
                            </button>
                          ) : request.status === "completed" ? (
                            <span className="text-sm font-medium text-green-600">
                              Order Created
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Showing page{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={
                      !pagination.hasPreviousPage || loading
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="min-w-10 rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white">
                    {pagination.currentPage}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      !pagination.hasNextPage || loading
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Create Order
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Create fulfillment order from this request.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseOrderModal}
                  disabled={creatingOrder}
                  className="text-xl text-slate-400 transition hover:text-slate-700 disabled:opacity-50"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 space-y-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Buyer
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {selectedRequest.buyer?.name || "N/A"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {selectedRequest.buyer?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Product
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {selectedRequest.product?.name ||
                      selectedRequest.productName ||
                      "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Quantity
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {selectedRequest.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Budget
                    </p>

                    <p className="mt-1 font-medium text-slate-900">
                      {selectedRequest.budget
                        ? `$${selectedRequest.budget}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Request ID
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-600">
                    {selectedRequest._id}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateOrder}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Priority
                  </label>

                  <select
                    value={orderForm.priority}
                    onChange={(event) =>
                      setOrderForm((previous) => ({
                        ...previous,
                        priority: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Deadline
                  </label>

                  <input
                    type="datetime-local"
                    value={orderForm.deadline}
                    onChange={(event) =>
                      setOrderForm((previous) => ({
                        ...previous,
                        deadline: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Internal Note
                  </label>

                  <textarea
                    value={orderForm.internalNote}
                    onChange={(event) =>
                      setOrderForm((previous) => ({
                        ...previous,
                        internalNote: event.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Add an internal note..."
                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseOrderModal}
                    disabled={creatingOrder}
                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={creatingOrder}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {creatingOrder
                      ? "Creating..."
                      : "Create Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminRequests;