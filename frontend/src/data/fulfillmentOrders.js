const fulfillmentStages = [
  {
    key: "new_order",
    label: "New Order",
    defaultDeadlineHours: 2,
  },
  {
    key: "payment_check",
    label: "Payment Check",
    defaultDeadlineHours: 4,
  },
  {
    key: "stock_confirmation",
    label: "Stock/Source Confirmation",
    defaultDeadlineHours: 6,
  },
  {
    key: "procurement",
    label: "Procurement",
    defaultDeadlineHours: 24,
  },
  {
    key: "packing",
    label: "Packing",
    defaultDeadlineHours: 8,
  },
  {
    key: "courier_handover",
    label: "Courier Handover",
    defaultDeadlineHours: 6,
  },
  {
    key: "in_transit",
    label: "In Transit",
    defaultDeadlineHours: 48,
  },
  {
    key: "delivered",
    label: "Delivered",
    defaultDeadlineHours: 24,
  },
  {
    key: "settlement",
    label: "Settlement",
    defaultDeadlineHours: 48,
  },
];

const teamMembers = [
  {
    id: "member-001",
    name: "Abdur Rahman",
  },
  {
    id: "member-002",
    name: "Tanvir Hasan",
  },
  {
    id: "member-003",
    name: "Sakib Ahmed",
  },
  {
    id: "member-004",
    name: "Nusrat Jahan",
  },
];

const products = [
  "Organic Honey",
  "Fresh Mango",
  "Premium Rice",
  "Natural Mustard Oil",
  "Organic Dates",
  "Fresh Green Tea",
  "Handmade Products",
  "Spices Collection",
];

const buyers = [
  "Rahim Enterprise",
  "Karim Traders",
  "Nahar Business",
  "Green Valley Shop",
  "Maa Enterprise",
  "Fresh Mart",
  "Daily Needs BD",
  "Trust Traders",
];

const stageKeys = fulfillmentStages.map((stage) => stage.key);

const stageLabels = Object.fromEntries(
  fulfillmentStages.map((stage) => [stage.key, stage.label])
);

const stageStatusMap = {
  new_order: "completed",
  payment_check: "completed",
  stock_confirmation: "in_progress",
  procurement: "pending",
  packing: "pending",
  courier_handover: "pending",
  in_transit: "pending",
  delivered: "pending",
  settlement: "pending",
};

const createStages = (currentStageIndex, delayed = false) => {
  return fulfillmentStages.map((stage, index) => {
    let status = "pending";

    if (index < currentStageIndex) {
      status = "completed";
    }

    if (index === currentStageIndex) {
      status = delayed ? "delayed" : "in_progress";
    }

    return {
      key: stage.key,
      name: stage.label,
      status,
      deadline: `2026-09-${21 + (index % 7)}T18:00:00`,
      completedAt:
        status === "completed"
          ? `2026-09-${20 + (index % 8)}T12:00:00`
          : null,
      note: "",
    };
  });
};

const orderConfigurations = [
  { stage: 0, priority: "high", delayed: false },
  { stage: 1, priority: "medium", delayed: false },
  { stage: 2, priority: "high", delayed: true },
  { stage: 3, priority: "low", delayed: false },
  { stage: 4, priority: "high", delayed: true },
  { stage: 5, priority: "medium", delayed: false },
  { stage: 6, priority: "high", delayed: false },
  { stage: 7, priority: "low", delayed: false },
  { stage: 8, priority: "medium", delayed: false },
  { stage: 2, priority: "high", delayed: true },
  { stage: 3, priority: "medium", delayed: false },
  { stage: 4, priority: "low", delayed: false },
  { stage: 5, priority: "high", delayed: true },
  { stage: 6, priority: "medium", delayed: false },
  { stage: 1, priority: "low", delayed: false },
  { stage: 7, priority: "high", delayed: false },
  { stage: 8, priority: "medium", delayed: true },
  { stage: 3, priority: "high", delayed: false },
  { stage: 4, priority: "low", delayed: false },
  { stage: 2, priority: "medium", delayed: false },
];

const fulfillmentOrders = orderConfigurations.map(
  (configuration, index) => {
    const orderNumber = String(index + 1).padStart(4, "0");

    const currentStage =
      stageKeys[configuration.stage];

    const assignedMember =
      teamMembers[index % teamMembers.length];

    const product = products[index % products.length];

    const buyer = buyers[index % buyers.length];

    return {
      id: `order-${index + 1}`,
      orderId: `SX-ORD-${orderNumber}`,
      buyer,
      product,
      quantity: (index + 1) * 5,
      priority: configuration.priority,
      assignedTo: assignedMember,
      currentStage,
      currentStageLabel: stageLabels[currentStage],
      paymentStatus:
        configuration.stage > 0 ? "paid" : "pending",
      procurementStatus:
        configuration.stage >= 3 ? "completed" : "pending",
      packingStatus:
        configuration.stage >= 4 ? "completed" : "pending",
      courierStatus:
        configuration.stage >= 5 ? "handed_over" : "pending",
      deliveryStatus:
        configuration.stage >= 7 ? "delivered" : "pending",
      internalNote: "",
      deadline: `2026-09-${21 + (index % 7)}T18:00:00`,
      isDelayed: configuration.delayed,
      stages: createStages(
        configuration.stage,
        configuration.delayed
      ),
      createdAt: `2026-09-${15 + (index % 6)}T10:00:00`,
    };
  }
);

export {
  fulfillmentStages,
  teamMembers,
  fulfillmentOrders,
};