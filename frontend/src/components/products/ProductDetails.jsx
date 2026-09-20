import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions";

const ProductDetails = ({ product }) => {
  return (
    <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8">
      <ProductImage product={product} />

      <div>
        <ProductInfo product={product} />

        <div className="mt-6">
          <ProductMeta product={product} />
        </div>

        <div className="mt-8">
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;