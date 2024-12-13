import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    equipment: {},
    equipments: [],
    formStatus: { success: null, message: "" },
    isEquipmentAdded: false,
    isEquipmentDeleted: false,
    isEquipmentUpdated: false,
    isEmailsuccess: null,
    error: null,
  },
  reducers: {
    equipmentRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    equipmentSuccess(state, action) {
      return {
        ...state,
        loading: false,
        equipment: action.payload.equipment,
      };
    },
    equipmentFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Request actions
    equipmentsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    equipmentsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        equipments: action.payload.equipments,
      };
    },
    equipmentsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Adding equipment actions
    addEquipmentRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    addEquipmentSuccess(state) {
      return {
        ...state,
        loading: false,
        isEquipmentAdded: true,
      };
    },
    addEquipmentFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Deleting equipment actions
    deleteEquipmentRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteEquipmentSuccess(state) {
      return {
        ...state,
        loading: false,
        isEquipmentDeleted: true,
      };
    },
    deleteEquipmentFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Updating equipment actions
    updateEquipmentRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateEquipmentSuccess(state) {
      return {
        ...state,
        loading: false,
        isEquipmentUpdated: true,
      };
    },
    updateEquipmentFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    sendEmailRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    sendEmailSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isEmailsuccess: action.payload,
        error: null,
      };
    },
    sendEmailFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isEmailsuccess: null,
      };
    },
    clearSendEamil(state) {
      return {
        ...state,
        isEmailsuccess: false,
      };
    },
    // Clear actions
    clearEquipmentAdded(state) {
      return {
        ...state,
        isEquipmentAdded: false,
      };
    },
    clearEquipmentUpdated(state) {
      return {
        ...state,
        isEquipmentUpdated: false,
      };
    },
    clearEquipmentDeleted(state) {
      return {
        ...state,
        isEquipmentDeleted: false,
      };
    },
    clearFormStatusUpdated(state) {
      return {
        ...state,
        isFormStatusUpdated: false,
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

const { actions, reducer } = adminSlice;

export const {
  equipmentRequest,
  equipmentSuccess,
  equipmentFail,
  equipmentsRequest,
  equipmentsSuccess,
  equipmentsFail,
  addEquipmentRequest,
  addEquipmentSuccess,
  addEquipmentFail,
  deleteEquipmentRequest,
  deleteEquipmentSuccess,
  deleteEquipmentFail,
  updateEquipmentRequest,
  updateEquipmentSuccess,
  updateEquipmentFail,
  clearEquipmentAdded,
  clearEquipmentDeleted,
  clearEquipmentUpdated,
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
  clearSendEamil,
  clearError,
} = actions;

export default reducer;
