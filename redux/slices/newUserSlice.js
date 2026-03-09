import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewUser } from "../../api/api";

// Async action to add a new user
export const addUser = createAsyncThunk("/admin/adduser", async (userData) => {
  const res = await addNewUser(userData);
  return res.data;
});

const initialState = {
  value: false,
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const newUserSlice = createSlice({
  name: "new user modal",
  initialState,
  reducers: {
    setNewUserOption: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Dispatch fetchData to update global users slice
        state.value = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setNewUserOption } = newUserSlice.actions;

export default newUserSlice.reducer;
