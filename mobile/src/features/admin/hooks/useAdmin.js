/**
 * useAdmin.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook for all admin-facing API operations.
 *
 * Cache flow for handleGetAllServices:
 *   1. Read `services` and `lastFetched` from Redux.
 *   2. Run isServiceCacheValid() — a single reusable helper.
 *   3. If VALID  → return cached data immediately (no network call).
 *   4. If INVALID → call the API, dispatch setServices (which stamps
 *                   lastFetched), and return the fresh data.
 *
 * All write operations (create / edit / delete / toggle) dispatch actions
 * that reset `lastFetched = null` in the slice, so the very next
 * handleGetAllServices() call will always fetch fresh data from the API.
 * ─────────────────────────────────────────────────────────────────────────────
 */
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
  clearServiceCache,
} from "../state/adminSlice";
import { isServiceCacheValid } from "../service/serviceCache";

export const useAdmin = () => {
  const dispatch = useDispatch();

  // Pull lastFetched alongside the usual fields so the cache check works
  const { services, currentService, isLoading, error, lastFetched } =
    useSelector((state) => state.admin);

  // ── Create ─────────────────────────────────────────────────────────────────
  const handleCreateService = async (data) => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await createService(data);
      if (res && res.service) {
        // addService also resets lastFetched → next getAllServices hits API
        dispatch(addService(res.service));
      }
      dispatch(setAdminLoading(false));
      return { success: true, service: res.service };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to create service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // ── Read (with cache) ───────────────────────────────────────────────────────
  /**
   * handleGetAllServices
   *
   * Cache-aware fetch:
   *   - CACHE HIT  → returns the existing Redux data without any API call.
   *                  This prevents duplicate network requests when the user
   *                  navigates back to a screen that already loaded services.
   *   - CACHE MISS → fetches from the API, stores result, stamps lastFetched.
   *
   * The hook deliberately does NOT call setAdminLoading when serving from
   * cache — there is nothing to load, so the skeleton should never flash.
   */
  const handleGetAllServices = async () => {
    // ── Cache check ────────────────────────────────────────────────────────
    if (isServiceCacheValid(services, lastFetched)) {
      // Cache is fresh — skip the API call entirely
      return { success: true, services, fromCache: true };
    }

    // ── Cache miss — fetch from backend ───────────────────────────────────
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await getAllServices();
      if (res && res.data) {
        // setServices stamps lastFetched = Date.now() inside the reducer
        dispatch(setServices(res.data));
      }
      dispatch(setAdminLoading(false));
      return { success: true, services: res.data, fromCache: false };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to fetch services";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // ── Update ─────────────────────────────────────────────────────────────────
  const handleEditService = async (id, data) => {
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null));
    try {
      const res = await editService(id, data);
      if (res && res.service) {
        // updateService also resets lastFetched → next getAllServices hits API
        dispatch(updateService(res.service));
      }
      dispatch(setAdminLoading(false));
      return { success: true, service: res.service };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to update service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // ── Read Single ────────────────────────────────────────────────────────────
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
        err?.response?.data?.message || err?.message || "Failed to fetch service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // ── Toggle availability (optimistic) ───────────────────────────────────────
  const handleToggleService = async (id) => {
    // 1. Optimistic update — UI reflects the change immediately
    //    toggleServiceAvailability also resets lastFetched in the slice
    dispatch(toggleServiceAvailability(id));
    try {
      await toggleService(id);
      return { success: true };
    } catch (err) {
      // 2. Revert on API failure — toggle back to original value
      dispatch(toggleServiceAvailability(id));
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to toggle service";
      dispatch(setAdminError(errMsg));
      return { success: false, error: errMsg };
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteService = async (id) => {
    dispatch(setAdminLoading(true));
    try {
      await deleteService(id);
      // deleteService action also resets lastFetched → next fetch hits API
      dispatch(deleteServiceAction(id));
      dispatch(setAdminLoading(false));
      return { success: true };
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || err?.message || "Failed to delete service";
      dispatch(setAdminError(errMsg));
      dispatch(setAdminLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  const handleClearCurrentService = () => {
    dispatch(clearCurrentService());
  };

  /**
   * handleClearServiceCache
   * Explicitly wipes services + lastFetched from Redux.
   * Use on logout, or when you need to force a guaranteed hard-refresh
   * regardless of the cache age.
   */
  const handleClearServiceCache = () => {
    dispatch(clearServiceCache());
  };

  return {
    services,
    currentService,
    isLoading,
    error,
    lastFetched,
    handleCreateService,
    handleGetAllServices,
    handleEditService,
    handleGetSingleService,
    handleToggleService,
    handleDeleteService,
    handleClearCurrentService,
    handleClearServiceCache,
  };
};
