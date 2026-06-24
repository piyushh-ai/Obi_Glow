import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  currentService: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex((s) => s.id === action.payload.id || s._id === action.payload._id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
      }
      if (state.currentService && (state.currentService.id === action.payload.id || state.currentService._id === action.payload._id)) {
        state.currentService = { ...state.currentService, ...action.payload };
      }
    },
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    },
    clearCurrentService: (state) => {
      state.currentService = null;
    },
    toggleServiceAvailability: (state, action) => {
      const service = state.services.find((s) => s.id === action.payload || s._id === action.payload);
      if (service) {
        service.isActive = !service.isActive;
        if (service.isAvailable !== undefined) {
          service.isAvailable = !service.isAvailable;
        }
      }
      if (state.currentService && (state.currentService.id === action.payload || state.currentService._id === action.payload)) {
        state.currentService.isActive = !state.currentService.isActive;
        if (state.currentService.isAvailable !== undefined) {
          state.currentService.isAvailable = !state.currentService.isAvailable;
        }
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (s) => s.id !== action.payload && s._id !== action.payload
      );
      if (state.currentService && (state.currentService.id === action.payload || state.currentService._id === action.payload)) {
        state.currentService = null;
      }
    },
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
  setAdminLoading,
  setAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;
