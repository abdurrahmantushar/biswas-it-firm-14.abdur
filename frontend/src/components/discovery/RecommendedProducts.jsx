import { Link } from "react-router-dom";
import { useRecommendedProducts } from "../../hooks/useProducts";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const getOptimizedImage = (url) => {
  if (!url) return "";

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  if (url.includes("/f_auto,q_auto")) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_400/"
  );
};

const RecommendedProducts = () => {
  const { data, loading, error } = useRecommendedProducts();

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  return (
<section className="min-h-[500px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
  <div className="mb-4">
    <h2 className="text-base font-bold text-slate-900">
      Recommended
    </h2>

    <p className="mt-1 text-xs text-slate-500">
      Products you may like
    </p>
  </div>

  <div className="min-h-[400px]">
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
                      src={getOptimizedImage(product.image)}
                      alt={product.name}
                      loading="lazy"
                      width="64"
                      height="64"
                      className="h-16 w-16 object-cover transition group-hover:scale-105"
                    />
                  ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-600">
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
      </div>
    </section>
  );
};

export default RecommendedProducts;