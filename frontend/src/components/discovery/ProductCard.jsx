import { Link } from "react-router-dom";
import SaveProductButton from "./SaveProductButton";

const getOptimizedImage = (url) => {
  if (!url) return "";

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_400/"
  );
};

const ProductCard = ({ product, priority = false }) => {
  const productId = product?._id || product?.id;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${productId}`}>
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          {product?.image ? (
            <img
              src={getOptimizedImage(product.image)}
              alt={product.name || "Product"}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-600">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {product?.name || "Product"}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">
              {product?.category?.name ||
                product?.category ||
                "Uncategorized"}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
            {product?.sourceType || "Source"}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-500">
            Price
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {product?.price
              ? `$${product.price}`
              : "On request"}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link
            to={`/products/${productId}`}
            className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
          >
            View Details
          </Link>

          <SaveProductButton productId={productId} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;