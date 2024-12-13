import axios from "axios";
import {
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
  clearError,
} from "../slices/detailSlice";

// Fetch all details
export const getDetails = () => async (dispatch) => {
  try {
    dispatch(detailsRequest());
    const { data } = await axios.get(`/api/v1/details`);
    dispatch(detailsSuccess({ details: data.details }));
  } catch (error) {
    dispatch(detailsFail(error.response.data.message));
  }
};

// Add new detail
export const addDetail = (detailData) => async (dispatch) => {
  try {
    dispatch(addDetailRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`/api/v1/admin/detail/new`, detailData, config);
    dispatch(addDetailSuccess());
  } catch (error) {
    dispatch(addDetailFail(error.response.data.message));
  }
};

// Delete detail
export const deleteDetail = (id) => async (dispatch) => {
  try {
    dispatch(deleteDetailRequest());
    await axios.delete(`/api/v1/admin/detail/${id}`);
    dispatch(deleteDetailSuccess());
  } catch (error) {
    dispatch(deleteDetailFail(error.response.data.message));
  }
};

// Update detail action
export const updateDetail = (id, detailData) => async (dispatch) => {
  try {
    dispatch(updateDetailRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`/api/v1/admin/detail/${id}`, detailData, config);
    dispatch(updateDetailSuccess());
  } catch (error) {
    dispatch(updateDetailFail(error.response.data.message));
  }
};

export const getDetail = id => async (dispatch) => {

  try {
      dispatch(detailRequest())
      const { data }  = await axios.get(`/api/v1/admin/detail/${id}`);
      dispatch(detailSuccess(data))
  } catch (error) {
      dispatch(detailFail(error.response.data.message))
  }

}

// Clear errors
export const clearHomeError = () => (dispatch) => {
  dispatch(clearError());
};
