import { createSlice } from "@reduxjs/toolkit";

const accordionSlice = createSlice({
  name: "accordion",
  initialState: {
    loading: false,
    accordion: null,
    error: null,
  },
  reducers: {
    accordionRequest(state) {
      state.loading = true;
      state.error = null; // Clear previous errors if any
    },
    accordionSuccess(state, action) {
      state.loading = false;
      state.accordion = action.payload; // Save fetched data
    },
    accordionFail(state, action) {
      state.loading = false;
      state.error = action.payload; // Save the error message
    },
    clearError(state) {
      state.error = null; // Clear error
    },
  },
});

const { actions, reducer } = accordionSlice;
export const { accordionRequest, accordionSuccess, accordionFail, clearError } =
  actions;
export default reducer;
