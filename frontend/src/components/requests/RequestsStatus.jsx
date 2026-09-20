
const RequestStatus = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
  };

  const currentStatus = status?.toLowerCase() || "pending";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        statusStyles[currentStatus] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {currentStatus}
    </span>
  );
};

export default RequestStatus;