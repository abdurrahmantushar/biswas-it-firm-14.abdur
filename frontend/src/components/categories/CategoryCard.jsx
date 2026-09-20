import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const categoryId = category?._id || category?.id;

  return (
    <Link
      to={`/categories/${categoryId}`}
      className="group block rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold text-slate-900">
            {category?.name || "Category"}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {category?.description ||
              "Explore products in this category."}
          </p>
        </div>

        <span className="shrink-0 text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900">
          →
        </span>
      </div>

      <div className="mt-5 text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
        View Products
      </div>
    </Link>
  );
};

export default CategoryCard;