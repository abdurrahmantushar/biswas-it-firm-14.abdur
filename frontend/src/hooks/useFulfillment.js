
import { useCallback } from "react";

import useFetch from "./useFetch";

import {
  getFulfillmentDashboard,
  getFulfillmentOrders,
  getFulfillmentOrderById,
  updateOrderStage,
  updateOrderAssignment,
  updateOrderPriority,
  updateOrderNote,
  updateOrderDeadline,
  updatePaymentStatus,
  getDelayAnalytics,
} from "../services/fulfillmentService";

export const useFulfillmentDashboard = () => {
  const fetchDashboard = useCallback(
    () => getFulfillmentDashboard(),
    []
  );

  return useFetch(fetchDashboard);
};

export const useFulfillmentOrders = (page = 1, limit = 5) => {
  const fetchOrders = useCallback(
    () => getFulfillmentOrders(page, limit),
    [page, limit]
  );

  return useFetch(fetchOrders);
};

export const useFulfillmentOrder = (id) => {
  const fetchOrder = useCallback(
    () => getFulfillmentOrderById(id),
    [id]
  );

  return useFetch(fetchOrder, {
    immediate: Boolean(id),
  });
};

export const useUpdateOrderStage = () => {
  const updateStage = useCallback(
    (id, stageData) => updateOrderStage(id, stageData),
    []
  );

  return useFetch(updateStage, {
    immediate: false,
  });
};

export const useUpdateOrderAssignment = () => {
  const updateAssignment = useCallback(
    (id, assignedTo) =>
      updateOrderAssignment(id, assignedTo),
    []
  );

  return useFetch(updateAssignment, {
    immediate: false,
  });
};

export const useUpdateOrderPriority = () => {
  const updatePriority = useCallback(
    (id, priority) =>
      updateOrderPriority(id, priority),
    []
  );

  return useFetch(updatePriority, {
    immediate: false,
  });
};

export const useUpdateOrderNote = () => {
  const updateNote = useCallback(
    (id, internalNote) =>
      updateOrderNote(id, internalNote),
    []
  );

  return useFetch(updateNote, {
    immediate: false,
  });
};

export const useUpdateOrderDeadline = () => {
  const updateDeadline = useCallback(
    (id, deadline) =>
      updateOrderDeadline(id, deadline),
    []
  );

  return useFetch(updateDeadline, {
    immediate: false,
  });
};

export const useUpdatePaymentStatus = () => {
  const updatePayment = useCallback(
    (id, paymentStatus) =>
      updatePaymentStatus(id, paymentStatus),
    []
  );

  return useFetch(updatePayment, {
    immediate: false,
  });
};

export const useDelayAnalytics = () => {
  const fetchAnalytics = useCallback(
    () => getDelayAnalytics(),
    []
  );

  return useFetch(fetchAnalytics);
};