import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  conditions: [],
  data: [],
  modifiedData: [],
  andor: []
};
export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addConditions(state, action) {
      state.conditions = [...state.conditions, action.payload];

      console.log(state.conditions);
    },
    addAndOR(state, action) {
      state.andor = [...state.andor, action.payload];
      console.log(state.andor);
    },
    updateAndOR(state, action) {
      state.andor[action.payload.index] = action.payload.value;
    },
    deleteConditionsAtIndex(state, action) {
      state.conditions = [
        ...state.conditions.filter((item, index) => index !== action.payload)
      ];
    },
    updateConditions(state, action) {
      state.conditions[action.payload.index].id = action.payload.id;
      state.conditions[action.payload.index].operator = action.payload.operator;
      state.conditions[action.payload.index].value = action.payload.value;
    },
    getData(state, action) {
      state.data = action.payload;
      state.modifiedData = action.payload;
    },
    updateData(state, action) {
      state.modifiedData = action.payload;
    }
  }
});

export const FilterActions = FilterSlice.actions;
