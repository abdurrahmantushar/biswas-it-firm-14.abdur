import api from "./api";

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const searchProducts = async (params = {}) => {
  const response = await api.get("/products/search", {
    params,
  });

  return response.data;
};

export const saveProduct = async (id) => {
  const response = await api.post(`/products/${id}/save`);

  return response.data;
};

export const getSavedProducts = async () => {
  const response = await api.get("/products/saved");

  return response.data;
};

export const getRelatedProducts = async (id) => {
  const response = await api.get(
    `/products/${id}/related`
  );

  return response.data;
};

export const getRecommendedProducts = async () => {
  const response = await api.get(
    "/products/recommended"
  );

  return response.data;
};

export const getPopularProducts = async () => {
  const response = await api.get("/products/popular");

  return response.data;
};