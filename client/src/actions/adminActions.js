import axios from "axios";
import {
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
  sendEmailRequest, 
  sendEmailSuccess, 
  sendEmailFailure, 
  clearError,
} from "../slices/adminSlice";

// Fetch all equipments
export const getEquipments = () => async (dispatch) => {
  try {
    dispatch(equipmentsRequest());
    const { data } = await axios.get(`/api/v1/equipments`);
    dispatch(equipmentsSuccess({ equipments: data.equipments }));
  } catch (error) {
    dispatch(equipmentsFail(error.response.data.message));
  }
};

// Add new equipment
export const addEquipment = (equipmentData) => async (dispatch) => {
  try {
    dispatch(addEquipmentRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`/api/v1/admin/equipment/new`, equipmentData, config);
    dispatch(addEquipmentSuccess());
  } catch (error) {
    dispatch(addEquipmentFail(error.response.data.message));
  }
};

// Delete equipment
export const deleteEquipment = (id) => async (dispatch) => {
  try {
    dispatch(deleteEquipmentRequest());
    await axios.delete(`/api/v1/admin/equipment/${id}`);
    dispatch(deleteEquipmentSuccess());
  } catch (error) {
    dispatch(deleteEquipmentFail(error.response.data.message));
  }
};

// Update equipment action
export const updateEquipment = (id, equipmentData) => async (dispatch) => {
  try {
    dispatch(updateEquipmentRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/v1/admin/equipment/${id}`, equipmentData, config);
    dispatch(updateEquipmentSuccess());
  } catch (error) {
    dispatch(updateEquipmentFail(error.response.data.message));
  }
};

export const getEquipment = id => async (dispatch) => {

  try {
      dispatch(equipmentRequest())
      const { data }  = await axios.get(`/api/v1/admin/equipment/${id}`);
      dispatch(equipmentSuccess(data))
  } catch (error) {
      dispatch(equipmentFail(error.response.data.message))
  }

}

// Action to send email
export const sendEmail = (formData) => async (dispatch) => {
  try {
      dispatch(sendEmailRequest());

      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };

      // Send the complete formData to the backend
      const { data } = await axios.post('/api/v1/send-email', formData, config);

      dispatch(sendEmailSuccess(data.message));
  } catch (error) {
      dispatch(sendEmailFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message));
  }
};

// Clear errors
export const clearHomeError = () => (dispatch) => {
  dispatch(clearError());
};


