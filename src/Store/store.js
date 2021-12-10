import { configureStore } from "@reduxjs/toolkit";
import { FilterSlice } from "./StateSlice";
const store = configureStore({
  reducer: FilterSlice.reducer
});

export default store;
