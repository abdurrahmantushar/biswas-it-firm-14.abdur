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

const ProductImage = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-100">
      {product?.image ? (
        <img
          src={getOptimizedImage(product.image)}
          alt={product.name || "Product"}
          loading="eager"
          fetchPriority="high"
          className="aspect-[4/3] h-full w-full object-cover"
        />
      ) : (
      <div className="flex aspect-[4/3] items-center justify-center text-sm text-slate-600">
        No Image Available
      </div>
      )}
    </div>
  );
};

export default ProductImage;