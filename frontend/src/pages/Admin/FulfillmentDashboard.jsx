import { Link } from "react-router-dom";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  useFulfillmentDashboard,
  useFulfillmentOrders,
  useDelayAnalytics,
} from "../../hooks/useFulfillment";


const FulfillmentDashboard = () => {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useFulfillmentDashboard();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useFulfillmentOrders(currentPage, ordersPerPage);

  const {
    data: analyticsData,
    loading: analyticsLoading,
    error: analyticsError,
  } = useDelayAnalytics();

  const dashboard = dashboardData?.dashboard;
  const orders = ordersData?.orders || [];
  const pagination = ordersData?.pagination;

  const analytics = analyticsData?.analytics || [];

  const chartData = analytics
    .filter((stage) => stage.delayedCount > 0)
    .map((stage) => ({
      name: stage.name,
      value: stage.delayedCount,
    }));

  const stats = [
    {
      label: "Total Orders",
      value: dashboard?.totalOrders ?? 0,
    },
    {
      label: "Pending Orders",
      value: dashboard?.pendingOrders ?? 0,
    },
    {
      label: "Processing Orders",
      value: dashboard?.processingOrders ?? 0,
    },
    {
      label: "Completed Orders",
      value: dashboard?.completedOrders ?? 0,
    },
    {
      label: "Delayed Orders",
      value: dashboard?.delayedOrders ?? 0,
    },
    {
      label: "Urgent Orders",
      value: dashboard?.urgentOrders ?? 0,
    },
  ];

  if (dashboardLoading) {
    return (
      <section className="p-6">
        <p className="text-slate-500">
          Loading fulfillment dashboard...
        </p>
      </section>
    );
  }

  if (dashboardError) {
    return (
      <section className="p-6">
        <p className="text-red-500">
          Failed to load fulfillment dashboard.
        </p>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Fulfillment Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage order fulfillment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>

            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Stage-wise Delay Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View delayed orders across fulfillment stages.
          </p>
        </div>

        <div className="mt-6 h-80">
          {analyticsLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-500">
                Loading delay analytics...
              </p>
            </div>
          ) : analyticsError ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-red-500">
                Failed to load delay analytics.
              </p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-500">
                No delayed stages found.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={[
                        "#3B82F6",
                        "#10B981",
                        "#F59E0B",
                        "#EF4444",
                        "#8B5CF6",
                        "#EC4899",
                        "#14B8A6",
                        "#F97316",
                        "#6366F1",
                      ][index % 9]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Fulfillment Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor current order fulfillment progress.
            </p>
          </div>

          <Link
            to="/admin/fulfillment/orders"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            View All Orders
          </Link>
        </div>

        {ordersLoading ? (
          <div className="p-5">
            <p className="text-sm text-slate-500">
              Loading orders...
            </p>
          </div>
        ) : ordersError ? (
          <div className="p-5">
            <p className="text-sm text-red-500">
              Failed to load fulfillment orders.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-5">
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
                    {[
                      "Order ID",
                      "Product",
                      "Quantity",
                      "Priority",
                      "Stage",
                      "Payment",
                      "Status",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
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
                          Product ID: {order.product?._id || "N/A"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {order.quantity}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium capitalize text-slate-700">
                        {order.priority}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm capitalize text-slate-600">
                        {order.currentStage?.replaceAll("_", " ")}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm capitalize text-slate-600">
                        {order.paymentStatus}
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
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination?.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={!pagination.hasPreviousPage}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <p className="text-sm text-slate-500">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      pagination.hasNextPage ? page + 1 : page
                    )
                  }
                  disabled={!pagination.hasNextPage}
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

export default FulfillmentDashboard;