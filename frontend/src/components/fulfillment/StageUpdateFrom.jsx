import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrderStage } from "../../hooks/useFulfillment";

const StageUpdateForm = ({ order, onUpdated }) => {
  const [stage, setStage] = useState(order?.currentStage || "");
  const [status, setStatus] = useState("processing");
  const [note, setNote] = useState("");

  const { execute, loading } = useUpdateOrderStage();

  const currentStageData = order?.stages?.find(
    (item) => item.key === stage
  );

  useEffect(() => {
    setStage(order?.currentStage || "");
  }, [order?.currentStage]);

  useEffect(() => {
    setStatus(currentStageData?.status || "processing");
    setNote(currentStageData?.note || "");
  }, [currentStageData]);

  const handleStageChange = (event) => {
    const selectedStage = event.target.value;

    setStage(selectedStage);

    const selectedStageData = order?.stages?.find(
      (item) => item.key === selectedStage
    );

    setStatus(selectedStageData?.status || "processing");
    setNote(selectedStageData?.note || "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stage) {
      toast.error("Please select a fulfillment stage.");
      return;
    }

    try {
      const result = await execute(order._id, {
        currentStage: stage,
        status,
        note,
      });

      toast.success(
        result?.message || "Order stage updated successfully."
      );

      if (onUpdated) {
        onUpdated(result?.order);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update order stage."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        Update Fulfillment Stage
      </h2>

      <div className="mt-5 space-y-5">
        <div>
          <label
            htmlFor="fulfillment-stage"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Fulfillment Stage
          </label>

          <select
            id="fulfillment-stage"
            value={stage}
            onChange={handleStageChange}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {order?.stages?.map((item) => (
              <option
                key={item.key}
                value={item.key}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="stage-status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="stage-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="stage-note"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Stage Note
          </label>

          <textarea
            id="stage-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            disabled={loading}
            placeholder="Add an internal note for this stage..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Stage"}
        </button>
      </div>
    </form>
  );
};

export default StageUpdateForm;