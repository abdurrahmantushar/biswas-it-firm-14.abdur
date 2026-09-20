import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSavedProducts } from "../../services/productService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ProductGrid from "../../components/discovery/ProductGrid";

const SavedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedProducts = async () => {
      try {
        const result = await getSavedProducts();

        const data = Array.isArray(result)
          ? result
          : result?.products || [];

        setProducts(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load saved products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedProducts();
  }, []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Saved Products
          </h1>

          <p className="mt-2 text-slate-500">
            Products you saved for later.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : !products.length ? (
          <EmptyState message="No saved products found." />
        ) : (
          <ProductGrid
            products={products}
            loading={false}
          />
        )}
      </div>
    </div>
  );
};

export default SavedProducts;