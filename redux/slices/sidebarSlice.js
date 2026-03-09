import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarOption: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSidebarOption } = sidebarSlice.actions;

export default sidebarSlice.reducer;
