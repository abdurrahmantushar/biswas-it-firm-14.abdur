import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers } from "../../services/adminService";
import OrderPriority from "../../components/fulfillment/OrderPriority";
import {
    useFulfillmentOrder,
    useUpdateOrderAssignment,
    useUpdatePaymentStatus,
    useUpdateOrderNote,
    useUpdateOrderDeadline
} from "../../hooks/useFulfillment";
import StageUpdateForm from "../../components/fulfillment/StageUpdateFrom";

const FulfillmentOrderDetails = () => {
    const { id } = useParams();

    const {
        data,
        loading,
        error,
    } = useFulfillmentOrder(id);

    const {
        execute: updateAssignment,
        loading: assignmentLoading,
    } = useUpdateOrderAssignment();

    const {
        execute: updatePayment,
        loading: paymentLoading,
    } = useUpdatePaymentStatus();

    const {
    execute: updateNote,
    loading: noteLoading,
    } = useUpdateOrderNote();

    const {
    execute: updateDeadline,
    loading: deadlineLoading,
    } = useUpdateOrderDeadline();

    const order = data?.order;

    const [orderData, setOrderData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [assignedTo, setAssignedTo] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamMembersLoading, setTeamMembersLoading] = useState(true);
    const [internalNote, setInternalNote] = useState("");
    const [deadline, setDeadline] = useState("");
    const currentOrder = orderData || order;

    useEffect(() => {
        if (order) {
            setOrderData(order);
            setPaymentStatus(order.paymentStatus || "pending");
            setAssignedTo(order.assignedTo?._id || "");
            setInternalNote(order.internalNote || "");
            setDeadline(
            order.deadline
                ? new Date(order.deadline)
                      .toISOString()
                      .slice(0, 16): ""
            );
        }
    }, [order]);

    useEffect(() => {
        const loadTeamMembers = async () => {
            try {
                const result = await getUsers();

                const users = result?.users || [];

                const admins = users.filter(
                    (user) =>
                        user.role === "admin" &&
                        user.status === "active"
                );

                setTeamMembers(admins);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load team members."
                );
            } finally {
                setTeamMembersLoading(false);
            }
        };

        loadTeamMembers();
    }, []);

    const handleAssignmentChange = async (event) => {
        const newAssignedTo = event.target.value || null;

        setAssignedTo(newAssignedTo || "");

        try {
            const result = await updateAssignment(
                currentOrder._id,
                newAssignedTo
            );

            const selectedMember = teamMembers.find(
                (member) => member._id === newAssignedTo
            );

            setOrderData((previous) => ({
                ...previous,
                assignedTo: selectedMember || null,
            }));

            toast.success(
                result?.message ||
                "Team member assignment updated successfully."
            );
        } catch (error) {
            setAssignedTo(
                currentOrder.assignedTo?._id || ""
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update team member assignment."
            );
        }
    };

    const handlePaymentChange = async (event) => {
        const newPaymentStatus = event.target.value;

        setPaymentStatus(newPaymentStatus);

        try {
            const result = await updatePayment(
                currentOrder._id,
                newPaymentStatus
            );

            setOrderData((previous) => ({
                ...previous,
                paymentStatus: newPaymentStatus,
            }));

            toast.success(
                result?.message ||
                "Payment status updated successfully."
            );
        } catch (error) {
            setPaymentStatus(
                currentOrder.paymentStatus || "pending"
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update payment status."
            );
        }
    };

    const handleNoteSubmit = async (event) => {
    event.preventDefault();

    try {
        const result = await updateNote(
            currentOrder._id,
            internalNote
        );

        setOrderData((previous) => ({
            ...previous,
            internalNote,
        }));

        toast.success(
            result?.message ||
                "Internal note updated successfully."
        );
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
                "Failed to update internal note."
        );
    }
    };

    const handleDeadlineSubmit = async (event) => {
    event.preventDefault();

    if (!deadline) {
        toast.error("Please select a deadline.");
        return;
    }

    try {
        const result = await updateDeadline(
            currentOrder._id,
            new Date(deadline).toISOString()
        );

        setOrderData((previous) => ({
            ...previous,
            deadline: result?.order?.deadline || deadline,
        }));

        toast.success(
            result?.message ||
                "Order deadline updated successfully."
        );
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
                "Failed to update order deadline."
        );
    }
    };

    if (loading) {
        return (
            <section className="p-6">
                <p className="text-slate-500">
                    Loading order details...
                </p>
            </section>
        );
    }

    if (error || !currentOrder) {
        return (
            <section className="p-6">
                <p className="text-red-500">
                    Failed to load order details.
                </p>

                <Link
                    to="/admin/fulfillment/orders"
                    className="mt-4 inline-block text-sm font-medium text-slate-900 hover:underline"
                >
                    Back to Orders
                </Link>
            </section>
        );
    }

    return (
        <section className="p-6">
            <div className="mb-6">
                <Link
                    to="/admin/fulfillment/orders"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    ← Back to Orders
                </Link>

                <div className="mt-4">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Order {currentOrder.orderId}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Fulfillment order details and workflow status.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Order Information
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">
                                Order ID
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {currentOrder.orderId}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Product
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {currentOrder.product?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Quantity
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {currentOrder.quantity}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Buyer
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {currentOrder.buyer?.name || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Payment Status
                            </p>

                            <p className="mt-1 font-medium capitalize text-slate-900">
                                {currentOrder.paymentStatus}
                            </p>
                        </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Priority
                                </p>

                                <div className="mt-2">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            currentOrder.priority === "urgent"
                                                ? "bg-red-100 text-red-700"
                                                : currentOrder.priority === "high"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : currentOrder.priority === "medium"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {currentOrder.priority || "medium"}
                                    </span>
                                </div>
                            </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Assigned To
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                                {currentOrder.assignedTo?.name ||
                                    "Not assigned"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Current Stage
                            </p>

                            <p className="mt-1 font-medium capitalize text-slate-900">
                                {currentOrder.currentStage?.replaceAll(
                                    "_",
                                    " "
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Fulfillment Status
                    </h2>

                    <div className="mt-5">
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                currentOrder.isDelayed
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {currentOrder.isDelayed
                                ? "Delayed"
                                : "On Track"}
                        </span>
                    </div>

                <div className="mt-6">
                    <h3 className="text-sm font-medium text-slate-700">
                        Order Deadline
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {currentOrder.deadline
                            ? new Date(
                                currentOrder.deadline
                            ).toLocaleString()
                            : "Not set"}
                    </p>

                    <form
                        onSubmit={handleDeadlineSubmit}
                        className="mt-4"
                    >
                        <label
                            htmlFor="order-deadline"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Update Deadline
                        </label>

                        <input
                            id="order-deadline"
                            type="datetime-local"
                            value={deadline}
                            onChange={(event) =>
                                setDeadline(event.target.value)
                            }
                            disabled={deadlineLoading}
                            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                            type="submit"
                            disabled={deadlineLoading}
                            className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {deadlineLoading
                                ? "Updating..."
                                : "Update Deadline"}
                        </button>
                    </form>
                </div>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <OrderPriority
                        order={currentOrder}
                        onUpdated={() => window.location.reload()}
                    />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <label
                        htmlFor="assigned-to"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Assigned Team Member
                    </label>

                    <select
                        id="assigned-to"
                        value={assignedTo}
                        onChange={handleAssignmentChange}
                        disabled={
                            assignmentLoading ||
                            teamMembersLoading
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <option value="">
                            {teamMembersLoading
                                ? "Loading team members..."
                                : "Not assigned"}
                        </option>

                        {teamMembers.map((member) => (
                            <option
                                key={member._id}
                                value={member._id}
                            >
                                {member.name}
                            </option>
                        ))}
                    </select>

                    {assignmentLoading && (
                        <p className="mt-2 text-xs text-slate-500">
                            Updating assignment...
                        </p>
                    )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <label
                        htmlFor="payment-status"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Payment Status
                    </label>

                    <select
                        id="payment-status"
                        value={paymentStatus}
                        onChange={handlePaymentChange}
                        disabled={paymentLoading}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm capitalize outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="verified">
                            Verified
                        </option>

                        <option value="failed">
                            Failed
                        </option>
                    </select>

                    {paymentLoading && (
                        <p className="mt-2 text-xs text-slate-500">
                            Updating payment status...
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    Fulfillment Timeline
                </h2>

                <div className="mt-6 space-y-5">
                    {currentOrder.stages?.map((stage, index) => (
                        <div
                            key={stage.key}
                            className="flex gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`h-4 w-4 rounded-full ${
                                        stage.status === "completed"
                                            ? "bg-green-500"
                                            : stage.status === "delayed"
                                                ? "bg-red-500"
                                                : stage.status === "processing"
                                                    ? "bg-blue-500"
                                                    : "bg-slate-300"
                                    }`}
                                />

                                {index !==
                                    currentOrder.stages.length - 1 && (
                                    <div className="mt-1 h-full min-h-10 w-px bg-slate-200" />
                                )}
                            </div>

                            <div className="flex-1 pb-5">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="font-medium capitalize text-slate-900">
                                        {stage.name}
                                    </h3>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                                            stage.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : stage.status === "delayed"
                                                    ? "bg-red-100 text-red-700"
                                                    : stage.status === "processing"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {stage.status}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Deadline:{" "}
                                    {stage.deadline
                                        ? new Date(
                                              stage.deadline
                                          ).toLocaleString()
                                        : "N/A"}
                                </p>

                                {stage.completedAt && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        Completed:{" "}
                                        {new Date(
                                            stage.completedAt
                                        ).toLocaleString()}
                                    </p>
                                )}

                                {stage.note && (
                                    <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                                        {stage.note}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <StageUpdateForm
                    order={currentOrder}
                    onUpdated={() => window.location.reload()}
                />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    Internal Note
                </h2>

                <form onSubmit={handleNoteSubmit} className="mt-4">
                    <textarea
                        value={internalNote}
                        onChange={(event) =>
                            setInternalNote(event.target.value)
                        }
                        rows={5}
                        placeholder="Add an internal note..."
                        disabled={noteLoading}
                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                        type="submit"
                        disabled={noteLoading}
                        className="mt-3 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {noteLoading ? "Saving..." : "Save Note"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default FulfillmentOrderDetails;



