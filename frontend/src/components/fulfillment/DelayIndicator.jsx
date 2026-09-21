
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const DelayIndicator = ({ isDelayed = false }) => {
  if (isDelayed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        <FiAlertCircle />
        Delayed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
      <FiCheckCircle />
      On Track
    </span>
  );
};

export default DelayIndicator;