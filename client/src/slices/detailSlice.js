import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    loading: false,
    detail: {},
    details: [],
    isDetailAdded: false,
    isDetailDeleted: false,
    isDetailUpdated: false,
    error: null,
  },
  reducers: {
    detailRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    detailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        detail: action.payload.detail,
      };
    },
    detailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Request actions
    detailsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    detailsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        details: action.payload.details,
      };
    },
    detailsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Adding detail actions
    addDetailRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    addDetailSuccess(state) {
      return {
        ...state,
        loading: false,
        isDetailAdded: true,
      };
    },
    addDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Deleting detail actions
    deleteDetailRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteDetailSuccess(state) {
      return {
        ...state,
        loading: false,
        isDetailDeleted: true,
      };
    },
    deleteDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Updating detail actions
    updateDetailRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateDetailSuccess(state) {
      return {
        ...state,
        loading: false,
        isDetailUpdated: true,
      };
    },
    updateDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Clear actions
    clearDetailAdded(state) {
      return {
        ...state,
        isDetailAdded: false,
      };
    },
    clearDetailUpdated(state) {
      return {
        ...state,
        isDetailUpdated: false,
      };
    },
    clearDetailDeleted(state) {
      return {
        ...state,
        isDetailDeleted: false,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = detailSlice;

export const {
  detailRequest,
  detailSuccess,
  detailFail,
  detailsRequest,
  detailsSuccess,
  detailsFail,
  addDetailRequest,
  addDetailSuccess,
  addDetailFail,
  deleteDetailRequest,
  deleteDetailSuccess,
  deleteDetailFail,
  updateDetailRequest,
  updateDetailSuccess,
  updateDetailFail,
  clearDetailAdded,
  clearDetailDeleted,
  clearDetailUpdated,
  clearError,
} = actions;

export default reducer;
