import locationSlice from "./locationSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    location: locationSlice,
  },
});
