import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading = false,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!products.length) {
    return <EmptyState message="No products found." />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index === 0}
        />
      ))}
    </div>
  );
};

export default ProductGrid;