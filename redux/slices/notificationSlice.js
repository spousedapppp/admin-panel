import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const notificationSlice = createSlice({
  name: "notification modal",
  initialState,
  reducers: {
    setNotificationOption: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {  setNotificationOption } = notificationSlice.actions;

export default notificationSlice.reducer;
