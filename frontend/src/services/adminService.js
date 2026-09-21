
import api from "./api";

export const createOrderFromRequest = async (orderData) => {
  const response = await api.post("/fulfillment/orders", orderData);
  return response.data;
};

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getSourceRequests = async (page = 1, limit = 3) => {
  const response = await api.get(
    `/admin/requests?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.patch(`/admin/requests/${id}`, {
    status,
  });

  return response.data;
};

export const updateSourceVerification = async (id, status) => {
  const response = await api.patch(
    `/admin/sources/${id}/verification`,
    {
      status,
    }
  );

  return response.data;
};