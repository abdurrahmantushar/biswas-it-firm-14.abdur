import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSourceRequest } from "../../services/requestService";
import Button from "../common/Button";
import Input from "../common/Input";

const SourceRequestForm = ({ productId = "" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId,
    quantity: "",
    budget: "",
    sourceType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.productId) {
      toast.error("Please select a product.");
      return;
    }

    if (!formData.quantity || Number(formData.quantity) < 1) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (!formData.sourceType) {
      toast.error("Please select a source type.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your request message.");
      return;
    }

    const requestData = {
      product: formData.productId,
      quantity: Number(formData.quantity),
      budget: formData.budget
        ? Number(formData.budget)
        : undefined,
      sourceType: formData.sourceType,
      message: formData.message.trim(),
    };

    try {
      setLoading(true);

      await createSourceRequest(requestData);

      toast.success("Source request created successfully.");

      navigate("/requests");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create source request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="productId"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Product ID
          </label>

          <Input
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Enter product ID"
            disabled={Boolean(productId)}
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Quantity
          </label>

          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Budget
          </label>

          <Input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter your budget"
            min="0"
          />
        </div>

        <div>
          <label
            htmlFor="sourceType"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Source Type
          </label>

          <select
            id="sourceType"
            name="sourceType"
            value={formData.sourceType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          >
            <option value="">Select source type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="supplier">Supplier</option>
            <option value="distributor">Distributor</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your sourcing requirement..."
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
        />
      </div>

      <div className="mt-6">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};

export default SourceRequestForm;