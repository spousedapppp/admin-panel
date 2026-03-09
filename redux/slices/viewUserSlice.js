import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  data: {},
};

export const viewUserSlice = createSlice({
  name: "view user modal",
  initialState,
  reducers: {
    setViewUserOption: (state, action) => {
      state.value = action.payload;
    },
    setViewUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setViewUserOption, setViewUserData } = viewUserSlice.actions;

export default viewUserSlice.reducer;
