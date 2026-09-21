import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getMyRequests } from "../../services/requestService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import RequestList from "../../components/requests/RequestList";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 3,
    totalRequests: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);

        const result = await getMyRequests(currentPage, 3);

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

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          ← Back
        </button>

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
          <>
            <RequestList requests={requests} />

            {pagination.totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row">
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
                    disabled={!pagination.hasPreviousPage || loading}
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
                    disabled={!pagination.hasNextPage || loading}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Requests;