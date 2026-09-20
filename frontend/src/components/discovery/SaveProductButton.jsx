import { toast } from "react-toastify";
import { useSaveProduct } from "../../hooks/useProducts";

const SaveProductButton = ({ productId }) => {
  const {
    loading,
    execute,
  } = useSaveProduct();

  const handleSave = async () => {
    if (!productId) {
      toast.error("Product ID is missing.");
      return;
    }

    try {
      await execute(productId);

      toast.success("Product saved successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save product."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading || !productId}
      className="w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Saving..." : "Save Product"}
    </button>
  );
};

export default SaveProductButton;