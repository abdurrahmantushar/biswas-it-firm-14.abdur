import api from "./api";

export const createSourceRequest = async (requestData) => {
  const response = await api.post("/requests", requestData);
  return response.data;
};

export const getMyRequests = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/requests/my?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getRequestById = async (id) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};