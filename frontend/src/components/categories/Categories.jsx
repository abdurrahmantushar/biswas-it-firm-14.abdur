import { useCategories } from "../../hooks/useCategories";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import CategoryGrid from "./CategoryGrid";

const Categories = () => {
  const {
    data,
    loading,
    error,
  } = useCategories();

  const categories = Array.isArray(data)
    ? data
    : data?.categories || [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Product Categories
          </h1>

          <p className="mt-2 text-slate-500">
            Explore products by category.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message="Failed to load categories." />
        ) : !categories.length ? (
          <EmptyState message="No categories found." />
        ) : (
          <CategoryGrid categories={categories} />
        )}
      </div>
    </main>
  );
};

export default Categories;