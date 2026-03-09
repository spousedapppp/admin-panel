import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  data: {},
};

export const cancelSubSlice = createSlice({
  name: "Cancel User Subscription",
  initialState,
  reducers: {
    setCancelSubOption: (state, action) => {
      state.value = action.payload;
    },
    setCancelSubData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCancelSubOption,  setCancelSubData } = cancelSubSlice.actions;

export default cancelSubSlice.reducer;
