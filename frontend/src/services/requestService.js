import api from "./api";

export const createSourceRequest = async (requestData) => {
  const response = await api.post("/requests", requestData);
  return response.data;
};

export const getMyRequests = async () => {
  const response = await api.get("/requests/my");
  return response.data;
};

export const getRequestById = async (id) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};