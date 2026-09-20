import { useParams } from "react-router-dom";
import { useCategory, useCategoryProducts } from "../../hooks/useCategories";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import ProductGrid from "../discovery/ProductGrid";

const CategoryProducts = () => {
   console.log("CategoryProducts rendered");

  const { id } = useParams();
console.log("Category ID:", id);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory(id);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useCategoryProducts(id);

  const category = categoryData?.category || categoryData;

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  if (categoryLoading || productsLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Loader />
        </div>
      </main>
    );
  }

  if (categoryError || productsError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage message="Failed to load category products." />
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage message="Category not found." />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {category.name}
          </h1>

          <p className="mt-2 text-slate-500">
            Explore products available in this category.
          </p>
        </div>

        {!products.length ? (
          <EmptyState message="No products found in this category." />
        ) : (
          <ProductGrid
            products={products}
            loading={false}
          />
        )}
      </div>
    </main>
  );
};

export default CategoryProducts;