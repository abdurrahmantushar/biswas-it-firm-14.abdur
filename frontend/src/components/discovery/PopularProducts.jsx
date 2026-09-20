
import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";
import { usePopularProducts } from "../../hooks/useProducts";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const PopularProducts = () => {
  const { data, loading, error } = usePopularProducts();

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <FiTrendingUp className="text-lg" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Popular Products
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Products buyers are interested in
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-4">
          <Loader />
        </div>
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
          Failed to load popular products.
        </p>
      ) : !products.length ? (
        <div className="py-2">
          <EmptyState message="No popular products yet." />
        </div>
      ) : (
        <div className="space-y-3">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product._id || product.id}
              to={`/products/${product._id || product.id}`}
              className="group flex gap-3 rounded-xl border border-slate-100 p-2 transition hover:border-orange-200 hover:bg-slate-50"
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
                <h3 className="truncate text-sm font-semibold text-slate-800 group-hover:text-orange-600">
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

export default PopularProducts;