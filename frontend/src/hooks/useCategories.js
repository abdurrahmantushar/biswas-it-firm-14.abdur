import { useCallback } from "react";
import useFetch from "./useFetch";
import {
  getCategories,
  getCategoryById,
  getCategoryProducts,
} from "../services/categoryService";

export const useCategories = () => {
  const fetchCategories = useCallback(
    () => getCategories(),
    []
  );

  return useFetch(fetchCategories);
};

export const useCategory = (id) => {
  const fetchCategory = useCallback(
    () => getCategoryById(id),
    [id]
  );

  return useFetch(fetchCategory, {
    immediate: Boolean(id),
  });
};

export const useCategoryProducts = (id) => {
  const fetchProducts = useCallback(
    () => getCategoryProducts(id),
    [id]
  );

  return useFetch(fetchProducts, {
    immediate: Boolean(id),
  });
};