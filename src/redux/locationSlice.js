import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null,
  },
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    removeLocation: (state) => {
      state.location = null;
    },
  },
});

export const { addLocation, removeLocation } = locationSlice.actions;

export default locationSlice.reducer;
