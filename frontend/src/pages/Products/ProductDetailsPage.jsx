import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import ProductDetails from "../../components/products/ProductDetails";

import RecommendedProducts from "../../components/discovery/RecommendedProducts";
import RelatedProducts from "../../components/discovery/RelatedProducts";


const ProductDetailsPage = () => {
  const { id } = useParams();

  const {
    data,
    loading,
    error,
  } = useProduct(id);

  const product = data?.product || data;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage message="Failed to load product details." />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage message="Product not found." />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ProductDetails product={product} />

        <RelatedProducts productId={product.id} />

        <RecommendedProducts />
      </div>
    </main>
  );
};

export default ProductDetailsPage;