import { useState } from "react";
import { toast } from "react-toastify";
import { updateSourceVerification } from "../../services/adminService";

const SourceVerification = ({ source, onUpdated }) => {
  const [loading, setLoading] = useState(false);

  const sourceId = source?._id || source?.id;

  const handleVerification = async (status) => {
    if (!sourceId) {
      toast.error("Source ID is missing.");
      return;
    }

    try {
      setLoading(true);

      const result = await updateSourceVerification(
        sourceId,
        status
      );

      const updatedSource =
        result?.product || {
          ...source,
          verificationStatus: status,
        };

      onUpdated?.(updatedSource);

      toast.success(
        "Source verification updated successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update source verification."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="text-sm font-medium capitalize text-slate-600">
        {source?.verificationStatus || "pending"}
      </span>

      <select
        value={source?.verificationStatus || "pending"}
        onChange={(event) =>
          handleVerification(event.target.value)
        }
        disabled={loading}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
};

export default SourceVerification;