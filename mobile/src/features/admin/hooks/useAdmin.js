import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  getAllServices,
  editService,
  getSingleService,
  deleteService,
  toggleService,
} from "../service/Admin.api";
import {
  setAdminLoading,
  setAdminError,
  addService,
  setServices,
  updateService,
  setCurrentService,
  clearCurrentService,
  deleteService as deleteServiceAction,
  toggleServiceAvailability,
} from "../state/adminSlice";

export const useAdmin = () => {
  const dispatch = useDispatch();
  const { services, currentService, isLoading, error } = useSelector(
    (state) => state.admin,
  );

  const handleCreateService = async (data) => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await createService(data);
      if (res && res.service) {
        dispatch(addService(res.service));
      }
      dispatch(setAdminLoading(false));
      return { success: true, service: res.service };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  const handleGetAllServices = async () => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await getAllServices();
      if (res && res.data) {
        dispatch(setServices(res.data));
      }
      dispatch(setAdminLoading(false));
      return { success: true, services: res.data };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch services";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  const handleEditService = async (id, data) => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await editService(id, data);
      if (res && res.service) {
        dispatch(updateService(res.service));
      }
      dispatch(setAdminLoading(false));
      return { success: true, service: res.service };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  const handleGetSingleService = async (id) => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await getSingleService(id);
      if (res && res.service) {
        dispatch(setCurrentService(res.service));
      }
      dispatch(setAdminLoading(false));
      return { success: true, service: res.service };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  const handleToggleService = async (id) => {
    // Optimistic UI toggle in Redux first
    dispatch(toggleServiceAvailability(id));
    try {
      await toggleService(id);
      return { success: true };
    } catch (err) {
      // Revert in case of API failure
      dispatch(toggleServiceAvailability(id));
      const errMsg = err?.response?.data?.message || err?.message || "Failed to toggle service";
      dispatch(setAdminError(errMsg));
      return { success: false, error: errMsg };
    }
  };

  const handleDeleteService = async (id) => {
    dispatch(setAdminLoading(true));
    try {
      await deleteService(id);
      dispatch(deleteServiceAction(id));
      dispatch(setAdminLoading(false));
      return { success: true };
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to delete service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  const handleClearCurrentService = () => {
    dispatch(clearCurrentService());
  };

  return {
    services,
    currentService,
    isLoading,
    error,
    handleCreateService,
    handleGetAllServices,
    handleEditService,
    handleGetSingleService,
    handleToggleService,
    handleDeleteService,
    handleClearCurrentService,
  };
};
