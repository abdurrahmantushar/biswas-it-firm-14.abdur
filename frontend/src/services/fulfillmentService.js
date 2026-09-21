
import api from "./api";


export const createFulfillmentOrder = async (orderData) => {
  const response = await api.post("/fulfillment/orders", orderData);
  return response.data;
};

export const getFulfillmentDashboard = async () => {
  const response = await api.get("/fulfillment/dashboard");
  return response.data;
};

export const getFulfillmentOrders = async (page = 1, limit = 5) => {
  const response = await api.get(
    `/fulfillment/orders?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getFulfillmentOrderById = async (id) => {
  const response = await api.get(`/fulfillment/orders/${id}`);
  return response.data;
};

export const updateOrderStage = async (id, stageData) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/stage`,
    stageData
  );

  return response.data;
};

export const updateOrderAssignment = async (id, assignedTo) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/assignment`,
    {
      assignedTo,
    }
  );

  return response.data;
};

export const updateOrderPriority = async (id, priority) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/priority`,
    {
      priority,
    }
  );

  return response.data;
};

export const updateOrderNote = async (id, internalNote) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/note`,
    {
      internalNote,
    }
  );

  return response.data;
};

export const updateOrderDeadline = async (id, deadline) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/deadline`,
    {
      deadline,
    }
  );

  return response.data;
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  const response = await api.patch(
    `/fulfillment/orders/${id}/payment`,
    {
      paymentStatus,
    }
  );

  return response.data;
};

export const getDelayAnalytics = async () => {
  const response = await api.get("/fulfillment/analytics/delays");
  return response.data;
};