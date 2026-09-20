const ProductInfo = ({ product }) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
          {product?.sourceType || "Source"}
        </span>

        {product?.category?.name && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {product.category.name}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
        {product?.name || "Product"}
      </h1>

      <p className="mt-4 text-2xl font-bold text-slate-900">
        {product?.price
          ? `$${product.price}`
          : "Price on request"}
      </p>

      <p className="mt-5 text-sm leading-7 text-slate-600">
        {product?.description ||
          "No product description available."}
      </p>
    </div>
  );
};

export default ProductInfo;