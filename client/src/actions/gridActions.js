import axios from "axios";
import { setApparentPower, setActivePower, setReactivePower, setLoading, setError } from "../slices/gridSlice";

// Action to fetch apparentpower data
export const fetchApparentPowerData = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/api/v1/getCard0`);

    if (response.data && response.data.length > 0) {
      dispatch(setApparentPower(response.data[0].measurements[0].apparentpower));
    } else {
      dispatch(setError("No data received from API"));
    }
  } catch (error) {
    dispatch(setError("Error fetching data"));
    console.error("Error fetching data:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to fetch activepower data
export const fetchActivePowerData = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
  
      const response = await axios.get(`/api/v1/getCard0`);
  
      if (response.data && response.data.length > 0) {
        dispatch(setActivePower(response.data[0].measurements[0].activepower));
      } else {
        dispatch(setError("No data received from API"));
      }
    } catch (error) {
      dispatch(setError("Error fetching data"));
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const fetchReactivePowerData = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
  
      const response = await axios.get(`/api/v1/getCard0`);
  
      if (response.data && response.data.length > 0) {
        dispatch(setReactivePower(response.data[0].measurements[0].reactivepower));
      } else {
        dispatch(setError("No data received from API"));
      }
    } catch (error) {
      dispatch(setError("Error fetching data"));
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
