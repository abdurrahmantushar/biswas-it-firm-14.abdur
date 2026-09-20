
import api from "./api";

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getSourceRequests = async () => {
  const response = await api.get("/admin/requests");
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