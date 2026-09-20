import { Link } from "react-router-dom";
import { useRecommendedProducts } from "../../hooks/useProducts";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const RecommendedProducts = () => {
  const { data, loading, error } = useRecommendedProducts();

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-900">
          Recommended
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Products you may like
        </p>
      </div>

      {loading ? (
        <div className="py-4">
          <Loader />
        </div>
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
          Failed to load recommendations.
        </p>
      ) : !products.length ? (
        <div className="py-2">
          <EmptyState message="No recommendations yet." />
        </div>
      ) : (
        <div className="space-y-3">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product._id || product.id}
              to={`/products/${product._id || product.id}`}
              className="group flex gap-3 rounded-xl border border-slate-100 p-2 transition hover:border-indigo-200 hover:bg-slate-50"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  {product.name}
                </h3>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {product.location}
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  ৳{Number(product.price).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedProducts;