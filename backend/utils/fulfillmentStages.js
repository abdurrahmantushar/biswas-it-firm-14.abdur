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
    key: "stock_source_confirmation",
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
    defaultDeadlineHours: 24,
  },
];

export default fulfillmentStages;