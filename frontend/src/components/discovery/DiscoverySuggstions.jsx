import {
  useRelatedProducts,
  useRecommendedProducts,
} from "../../hooks/useProducts";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import { Link } from "react-router-dom";
import PopularProducts from "./PopularProducts";

const SuggestionList = ({ products }) => {
  if (!products.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {products.slice(0, 4).map((product) => {
        const productId = product._id || product.id;

        return (
          <Link
            key={productId}
            to={`/products/${productId}`}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 p-2 transition hover:border-indigo-200 hover:bg-slate-50"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
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
        );
      })}
    </div>
  );
};

const DiscoverySuggestions = ({ products = [], search = "" }) => {
  const firstProductId = products[0]?._id || products[0]?.id;

  const {
    data: relatedData,
    loading: relatedLoading,
    error: relatedError,
  } = useRelatedProducts(firstProductId);

  const {
    data: recommendedData,
    loading: recommendedLoading,
    error: recommendedError,
  } = useRecommendedProducts();

  const relatedProducts = Array.isArray(relatedData)
    ? relatedData
    : relatedData?.products || [];

  const recommendedProducts = Array.isArray(recommendedData)
    ? recommendedData
    : recommendedData?.products || [];

  const showRelated = Boolean(search);

  return (
    <div className="space-y-5">
      {showRelated && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Related Products
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Similar products you may like.
            </p>
          </div>

          {relatedLoading ? (
            <Loader />
          ) : relatedError ? (
            <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
              Failed to load related products.
            </p>
          ) : !relatedProducts.length ? (
            <EmptyState message="No related products found." />
          ) : (
            <SuggestionList products={relatedProducts} />
          )}
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Recommended
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Products you may also like.
          </p>
        </div>

        {recommendedLoading ? (
          <Loader />
        ) : recommendedError ? (
          <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
            Failed to load recommendations.
          </p>
        ) : !recommendedProducts.length ? (
          <EmptyState message="No recommendations found." />
        ) : (
          <SuggestionList products={recommendedProducts} />
        )}
      </section>

      <PopularProducts/>
    </div>
  );
};

export default DiscoverySuggestions;