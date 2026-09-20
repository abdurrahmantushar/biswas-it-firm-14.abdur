
const ProductImage = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-100">
      {product?.image ? (
        <img
          src={product.image}
          alt={product.name || "Product"}
          className="aspect-[4/3] h-full w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center text-sm text-slate-400">
          No Image Available
        </div>
      )}
    </div>
  );
};

export default ProductImage;