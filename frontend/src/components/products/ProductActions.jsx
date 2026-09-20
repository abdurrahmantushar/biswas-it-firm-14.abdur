import { Link } from "react-router-dom";
import SaveProductButton from "../discovery/SaveProductButton";

const ProductActions = ({ product }) => {
  const productId = product?._id || product?.id;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        to={`/requests/create?product=${productId}`}
        className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Request Source
      </Link>

      <div className="sm:flex-1">
        <SaveProductButton productId={productId} />
      </div>
    </div>
  );
};

export default ProductActions;