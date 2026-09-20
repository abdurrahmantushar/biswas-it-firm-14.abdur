import { useCallback,useMemo } from "react";
import {
  getProducts,
  getProductById,
  searchProducts,
  saveProduct,
  getSavedProducts,
  getPopularProducts,
  getRelatedProducts,
  getRecommendedProducts,
} from "../services/productService";
import useFetch from "./useFetch";

export const useProducts = (params = {}) => {
  const stableParams = useMemo(
    () => params,
    [
      params.search,
      params.category,
      params.sourceType,
      params.location,
      params.minPrice,
      params.maxPrice,
      params.availability,
      params.sort,
    ]
  );

  const fetchProducts = useCallback(
    () => getProducts(stableParams),
    [stableParams]
  );

  return useFetch(fetchProducts);
};

export const useProduct = (id) => {
  const fetchProduct = useCallback(
    () => getProductById(id),
    [id]
  );

  return useFetch(fetchProduct, {
    immediate: Boolean(id),
  });
};

export const useProductSearch = () => {
  const search = useCallback(
    (params = {}) => searchProducts(params),
    []
  );

  return useFetch(search, {
    immediate: false,
  });
};

export const useSaveProduct = () => {
  const save = useCallback(
    (id) => saveProduct(id),
    []
  );

  return useFetch(save, {
    immediate: false,
  });
};

export const useSavedProducts = () => {
  const fetchSavedProducts = useCallback(
    () => getSavedProducts(),
    []
  );

  return useFetch(fetchSavedProducts);
};

export const useRelatedProducts = (id) => {
  const fetchRelated = useCallback(
    () => getRelatedProducts(id),
    [id]
  );

  return useFetch(fetchRelated, {
    immediate: Boolean(id),
  });
};

export const useRecommendedProducts = () => {
  const fetchRecommended = useCallback(
    () => getRecommendedProducts(),
    []
  );

  return useFetch(fetchRecommended);
};

export const usePopularProducts = () => {
  const fetchPopular = useCallback(
    () => getPopularProducts(),
    []
  );

  return useFetch(fetchPopular);
};