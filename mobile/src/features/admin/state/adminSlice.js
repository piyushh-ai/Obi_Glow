import { createSlice } from "@reduxjs/toolkit";

// ─────────────────────────────────────────────────────────────────────────────
// Initial State
// ─────────────────────────────────────────────────────────────────────────────
// `lastFetched` stores the Unix timestamp (ms) of the last successful
// getAllServices API call. null = data was never fetched in this session.
// The cache helper (serviceCache.js) uses this to decide if a new API
// request is needed or if the Redux store already has fresh-enough data.
// ─────────────────────────────────────────────────────────────────────────────
const initialState = {
  services: [],
  currentService: null,
  isLoading: false,
  error: null,
  lastFetched: null, // ← NEW: cache timestamp (ms since epoch)
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // ── Read ────────────────────────────────────────────────────────────────

    /**
     * setServices
     * Called only after a successful getAllServices() API response.
     * Stamps `lastFetched` with the current time so the cache helper
     * knows exactly when fresh data arrived.
     */
    setServices: (state, action) => {
      state.services = action.payload;
      // Refresh the cache timestamp every time fresh API data lands
      state.lastFetched = Date.now();
    },

    // ── Write operations (all invalidate the cache) ──────────────────────────
    // Why invalidate on write?
    //   After a create / update / delete / toggle, the backend state has
    //   changed. Although we update Redux optimistically / with the API
    //   response, the next explicit "fetch all" should always go to the
    //   server to guarantee consistency (e.g. if two admins are online).
    //   Resetting `lastFetched` to null forces the cache check to miss.

    /**
     * addService
     * Optimistically appends the newly created service.
     * Cache is invalidated so the next getAllServices() hits the API.
     */
    addService: (state, action) => {
      state.services.push(action.payload);
      state.lastFetched = null; // ← invalidate cache after create
    },

    /**
     * updateService
     * Merges the updated service fields in place.
     * Cache is invalidated so the next getAllServices() hits the API.
     */
    updateService: (state, action) => {
      const index = state.services.findIndex(
        (s) => s.id === action.payload.id || s._id === action.payload._id
      );
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
      }
      if (
        state.currentService &&
        (state.currentService.id === action.payload.id ||
          state.currentService._id === action.payload._id)
      ) {
        state.currentService = { ...state.currentService, ...action.payload };
      }
      state.lastFetched = null; // ← invalidate cache after update
    },

    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },

    clearCurrentService: (state) => {
      state.currentService = null;
    },

    /**
     * toggleServiceAvailability
     * Optimistic toggle — flips isActive/isAvailable locally before the
     * API call resolves (see useAdmin for the revert-on-failure pattern).
     * Cache is invalidated because backend state has been mutated.
     */
    toggleServiceAvailability: (state, action) => {
      const service = state.services.find(
        (s) => s.id === action.payload || s._id === action.payload
      );
      if (service) {
        service.isActive = !service.isActive;
        if (service.isAvailable !== undefined) {
          service.isAvailable = !service.isAvailable;
        }
      }
      if (
        state.currentService &&
        (state.currentService.id === action.payload ||
          state.currentService._id === action.payload)
      ) {
        state.currentService.isActive = !state.currentService.isActive;
        if (state.currentService.isAvailable !== undefined) {
          state.currentService.isAvailable = !state.currentService.isAvailable;
        }
      }
      state.lastFetched = null; // ← invalidate cache after toggle
    },

    /**
     * deleteService
     * Removes the service from the local list immediately.
     * Cache is invalidated so the next getAllServices() hits the API.
     */
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (s) => s.id !== action.payload && s._id !== action.payload
      );
      if (
        state.currentService &&
        (state.currentService.id === action.payload ||
          state.currentService._id === action.payload)
      ) {
        state.currentService = null;
      }
      state.lastFetched = null; // ← invalidate cache after delete
    },

    // ── Cache control ────────────────────────────────────────────────────────

    /**
     * clearServiceCache
     * Explicitly wipes both the services list and the cache timestamp.
     * Use when you need a guaranteed hard-refresh — e.g. on logout,
     * or from a debug/settings screen.
     *
     * Usage: dispatch(clearServiceCache())
     */
    clearServiceCache: (state) => {
      state.services = [];
      state.lastFetched = null;
    },

    // ── Loading / Error ──────────────────────────────────────────────────────

    setAdminLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setAdminError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setServices,
  addService,
  updateService,
  setCurrentService,
  clearCurrentService,
  toggleServiceAvailability,
  deleteService,
  clearServiceCache,
  setAdminLoading,
  setAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;
