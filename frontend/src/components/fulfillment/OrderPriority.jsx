import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrderPriority } from "../../hooks/useFulfillment";

const priorityStyles = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const OrderPriority = ({ order, onUpdated }) => {
  const [priority, setPriority] = useState(
    order?.priority || "medium"
  );

  const { execute, loading } = useUpdateOrderPriority();

  useEffect(() => {
    setPriority(order?.priority || "medium");
  }, [order?.priority]);

  const handlePriorityChange = async (event) => {
    const newPriority = event.target.value;

    setPriority(newPriority);

    try {
      const result = await execute(
        order._id,
        newPriority
      );

      toast.success(
        result?.message ||
          "Order priority updated successfully."
      );

      if (onUpdated) {
        onUpdated(result?.order);
      }
    } catch (error) {
      setPriority(order?.priority || "medium");

      toast.error(
        error.response?.data?.message ||
          "Failed to update order priority."
      );
    }
  };

  return (
    <div>
      <label
        htmlFor="order-priority"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Order Priority
      </label>

      <select
        id="order-priority"
        value={priority}
        onChange={handlePriorityChange}
        disabled={loading}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm capitalize outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <div className="mt-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            priorityStyles[priority] || priorityStyles.medium
          }`}
        >
          {priority}
        </span>
      </div>

      {loading && (
        <p className="mt-2 text-xs text-slate-500">
          Updating priority...
        </p>
      )}
    </div>
  );
};

export default OrderPriority;