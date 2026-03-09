import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "../../api/api";

export const deleteTheUser = createAsyncThunk(
  "/admin/deleteUser",
  async (userId) => {
    const res = await deleteUser(userId);
    return res.data;
  },
);

const initialState = {
  value: false,
  data: {},
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const deleteUserSlice = createSlice({
  name: "delete user modal",
  initialState,
  reducers: {
    setDeleteUserOption: (state, action) => {
      state.value = action.payload;
    },
    setDeleteUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTheUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTheUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteTheUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setDeleteUserData, setDeleteUserOption } =
  deleteUserSlice.actions;

export default deleteUserSlice.reducer;
