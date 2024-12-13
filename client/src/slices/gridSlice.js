import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apparentpower: null,
  activepower: null,
  reactivepower: null,
  loading: false,
  error: null,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setApparentPower: (state, action) => {
      state.apparentpower = action.payload;
    },
    setActivePower: (state, action) => {
      state.activepower = action.payload;
    },
    setReactivePower: (state, action) => {
      state.reactivepower = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setApparentPower,
  setActivePower,
  setReactivePower,
  setLoading,
  setError,
} = gridSlice.actions;
export default gridSlice.reducer;
