import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyRequests } from "../../services/requestService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import RequestList from "../../components/requests/RequestList";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const result = await getMyRequests();

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

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Requests
          </h1>

          <p className="mt-2 text-slate-500">
            Track all your source requests.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : !requests.length ? (
          <EmptyState message="No requests found." />
        ) : (
          <RequestList requests={requests} />
        )}
      </div>
    </div>
  );
};

export default Requests;