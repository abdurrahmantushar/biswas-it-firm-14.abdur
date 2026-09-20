import { useRelatedProducts } from "../../hooks/useProducts";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ProductGrid from "../discovery/ProductGrid";

const RelatedProducts = ({ productId }) => {
  const {
    data,
    loading,
    error,
  } = useRelatedProducts(productId);

  const products = Array.isArray(data)
    ? data
    : data?.products || [];

  if (loading) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Related Products
        </h2>

        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Related Products
        </h2>

        <p className="rounded-lg bg-red-50 p-4 text-red-600">
          Failed to load related products.
        </p>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Related Products
        </h2>

        <EmptyState message="No related products found." />
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl font-bold text-slate-900">
        Related Products
      </h2>

      <ProductGrid
        products={products}
        loading={false}
      />
    </section>
  );
};

export default RelatedProducts;