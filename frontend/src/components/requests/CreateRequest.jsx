
import { useNavigate,useSearchParams } from "react-router-dom";
import SourceRequestForm from "./SourceRequestForm";

const CreateRequest = () => {
      const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product") || "";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          ← Back
        </button>
                  
          <h1 className="text-3xl font-bold text-slate-900">
            Create Source Request
          </h1>

          <p className="mt-2 text-slate-500">
            Submit a request for a product source.
          </p>
        </div>

        <SourceRequestForm productId={productId} />
      </div>
    </div>
  );
};

export default CreateRequest;