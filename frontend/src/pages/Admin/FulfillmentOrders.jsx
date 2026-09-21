import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useFulfillmentOrders } from "../../hooks/UseFulfillment";

import {
  createFulfillmentOrder,
  getFulfillmentOrders,
} from "../../services/fulfillmentService";

const FulfillmentOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const { data, loading, error } = useFulfillmentOrders(
    currentPage,
    ordersPerPage
  );

  const orders = data?.orders || [];
  const pagination = data?.pagination;

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [orderList, setOrderList] = useState(null);

  const [formData, setFormData] = useState({
    orderId: "",
    buyer: "",
    product: "",
    quantity: "",
    priority: "medium",
    deadline: "",
  });

  const displayedOrders = orderList || orders;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateOrder = async (event) => {
    event.preventDefault();

    if (!formData.orderId.trim()) {
      toast.error("Order ID is required.");
      return;
    }

    if (!formData.buyer.trim()) {
      toast.error("Buyer ID is required.");
      return;
    }

    if (!formData.product.trim()) {
      toast.error("Product ID is required.");
      return;
    }

    if (!formData.quantity || Number(formData.quantity) < 1) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (!formData.deadline) {
      toast.error("Deadline is required.");
      return;
    }

    const orderData = {
      orderId: formData.orderId.trim(),
      buyer: formData.buyer.trim(),
      product: formData.product.trim(),
      quantity: Number(formData.quantity),
      priority: formData.priority,
      deadline: new Date(formData.deadline).toISOString(),
    };

    try {
      setCreating(true);

      await createFulfillmentOrder(orderData);

      toast.success("Order created successfully.");

      const refreshedData = await getFulfillmentOrders(
        currentPage,
        ordersPerPage
      );

      setOrderList(refreshedData?.orders || []);

      setFormData({
        orderId: "",
        buyer: "",
        product: "",
        quantity: "",
        priority: "medium",
        deadline: "",
      });

      setShowCreateForm(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create fulfillment order."
      );
    } finally {
      setCreating(false);
    }
  };

  const handlePrevious = () => {
    if (pagination?.hasPreviousPage) {
      setOrderList(null);
      setCurrentPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.hasNextPage) {
      setOrderList(null);
      setCurrentPage((page) => page + 1);
    }
  };

  if (loading && !orderList) {
    return (
      <section className="p-6">
        <p className="text-slate-500">
          Loading fulfillment orders...
        </p>
      </section>
    );
  }

  if (error && !orderList) {
    return (
      <section className="p-6">
        <p className="text-red-500">
          Failed to load fulfillment orders.
        </p>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Fulfillment Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all fulfillment orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm((previous) => !previous)}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {showCreateForm ? "Close Form" : "+ Create Order"}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Create Fulfillment Order
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new order for the fulfillment workflow.
            </p>
          </div>

          <form onSubmit={handleCreateOrder}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="orderId"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Order ID
                </label>

                <input
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  placeholder="SX-ORD-0006"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="buyer"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Buyer ID
                </label>

                <input
                  id="buyer"
                  name="buyer"
                  value={formData.buyer}
                  onChange={handleChange}
                  placeholder="Enter buyer ID"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="product"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Product ID
                </label>

                <input
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Enter product ID"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Quantity
                </label>

                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Deadline
                </label>

                <input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={creating}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creating ? "Creating..." : "Create Order"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {displayedOrders.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-slate-500">
              No fulfillment orders found.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Priority
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Current Stage
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Fulfillment Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {displayedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">
                        {order.orderId}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        <p className="font-medium text-slate-900">
                          {order.product?.name || "N/A"}
                        </p>

                        <p className="mt-1 break-all text-xs text-slate-400">
                          ID: {order.product?._id || "N/A"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {order.quantity}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="text-sm font-medium capitalize text-slate-700">
                          {order.priority}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="text-sm capitalize text-slate-600">
                          {order.currentStage?.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="text-sm capitalize text-slate-600">
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            order.isDelayed
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.isDelayed ? "Delayed" : "On Track"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <Link
                          to={`/admin/fulfillment/orders/${order._id}`}
                          className="text-sm font-medium text-slate-900 hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!orderList && pagination?.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={!pagination.hasPreviousPage || loading}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <p className="text-sm text-slate-500">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </p>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!pagination.hasNextPage || loading}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FulfillmentOrders;