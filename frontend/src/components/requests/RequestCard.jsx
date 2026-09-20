import { Link } from "react-router-dom";
import RequestStatus from "./RequestsStatus";

const RequestCard = ({ request }) => {
  const requestId = request?._id || request?.id;

  return (
    <Link
      to={`/requests/${requestId}`}
      className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Request #{requestId}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {request.product?.name ||
              request.productName ||
              "Source Request"}
          </h3>
        </div>

        <RequestStatus status={request.status} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">
            Quantity
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {request.quantity || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Budget
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {request.budget
              ? `$${request.budget}`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          {request.message || "No message provided."}
        </p>
      </div>
    </Link>
  );
};

export default RequestCard;