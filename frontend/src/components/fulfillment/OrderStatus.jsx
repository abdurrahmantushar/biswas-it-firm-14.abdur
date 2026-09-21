
const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  delayed: "bg-red-100 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
};

const OrderStatus = ({ status = "pending" }) => {
  const normalizedStatus = String(status).toLowerCase();
  const style = statusStyles[normalizedStatus] || statusStyles.pending;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${style}`}
    >
      {normalizedStatus.replaceAll("_", " ")}
    </span>
  );
};

export default OrderStatus;