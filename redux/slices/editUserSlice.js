import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../api/api";

export const editUser = createAsyncThunk(
  "/admin/editUser",
  async ({ userId, userData }) => {
    const res = await updateUser(userId, userData);
    return res.data;
  }
);

const initialState = {
  value: false,
  data: {},
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const editUserSlice = createSlice({
  name: "edit user modal",
  initialState,
  reducers: {
    setEditUserOption: (state, action) => {
      state.value = action.payload;
    },
    setEditUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setEditUserOption, setEditUserData } = editUserSlice.actions;

export default editUserSlice.reducer;
