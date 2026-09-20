
import { useCallback } from "react";
import useFetch from "./useFetch";
import {
  createSourceRequest,
  getMyRequests,
  getRequestById,
} from "../services/requestService";

export const useMyRequests = () => {
  const fetchRequests = useCallback(
    () => getMyRequests(),
    []
  );

  return useFetch(fetchRequests);
};

export const useRequest = (id) => {
  const fetchRequest = useCallback(
    () => getRequestById(id),
    [id]
  );

  return useFetch(fetchRequest, {
    immediate: Boolean(id),
  });
};

export const useCreateRequest = () => {
  const createRequest = useCallback(
    (requestData) => createSourceRequest(requestData),
    []
  );

  return useFetch(createRequest, {
    immediate: false,
  });
};