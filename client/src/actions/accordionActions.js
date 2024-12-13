import axios from "axios";
import {
  accordionRequest,
  accordionSuccess,
  accordionFail,
} from "../slices/accordionSlice";

export const fetchAccordionData = () => async (dispatch) => {
  try {
    dispatch(accordionRequest());
    const { data } = await axios.get(`/api/v1/totalTimeDifference`); // Fix typo and deconstruct response
    dispatch(accordionSuccess(data)); // Pass the fetched data
  } catch (error) {
    dispatch(
      accordionFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
