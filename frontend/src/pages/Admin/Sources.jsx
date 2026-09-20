import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../services/productService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import SourceVerification from "../../components/admin/SourceVerification";

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSources = async () => {
      try {
        const result = await getProducts();

        const data = Array.isArray(result)
          ? result
          : result?.products || [];

        setSources(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load sources."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSources();
  }, []);

  const handleSourceUpdated = (updatedSource) => {
    const updatedSourceId = String(
      updatedSource?._id || updatedSource?.id
    );

    setSources((previous) =>
      previous.map((source) => {
        const sourceId = String(
          source?._id || source?.id
        );

        if (sourceId !== updatedSourceId) {
          return source;
        }

        return {
          ...source,
          ...updatedSource,
        };
      })
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Source Management
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage available product sources.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : !sources.length ? (
          <EmptyState message="No sources found." />
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Product
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Source Type
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Price
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Verification
                  </th>
                </tr>
              </thead>

              <tbody>
                {sources.map((source) => {
                  const sourceId = source?._id || source?.id;

                  return (
                    <tr
                      key={sourceId}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {source.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {source.category?.name ||
                          source.category ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm capitalize text-slate-600">
                        {source.sourceType || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {source.price
                          ? `$${source.price}`
                          : "On request"}
                      </td>

                      <td className="px-6 py-4 text-sm capitalize text-slate-600">
                        {source.status || "Active"}
                      </td>

                      <td className="px-6 py-4">
                        <SourceVerification
                          source={source}
                          onUpdated={handleSourceUpdated}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Sources;