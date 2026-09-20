import RequestStatus from "./RequestsStatus";

const RequestDetailsComponent = ({ request }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Request #{request.id}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            {request.product?.name ||
              request.productName ||
              "Source Request"}
          </h1>
        </div>

        <RequestStatus status={request.status} />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Message
        </p>

        <p className="mt-2 leading-7 text-slate-700">
          {request.message || "No message provided."}
        </p>
      </div>
    </div>
  );
};

export default RequestDetailsComponent;