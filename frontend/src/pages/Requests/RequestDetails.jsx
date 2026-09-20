import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import RequestDetailsComponent from "../../components/requests/RequestDetails";
import { useRequest } from "../../hooks/useRequest";

const RequestDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useRequest(id);

  const request = data?.request || data;

  if (loading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ErrorMessage message="Failed to load request details." />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ErrorMessage message="Request not found." />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Request Details
          </h1>

          <p className="mt-2 text-slate-500">
            View the details and current status of your request.
          </p>
        </div>

        <RequestDetailsComponent request={request} />
      </div>
    </div>
  );
};

export default RequestDetails;