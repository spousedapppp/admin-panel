import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile, changeAdminPassword } from "../../api/api";

// Async action to update admin profile
export const updateAdminProfile = createAsyncThunk(
  "/admin/profile",
  async (data) => {
    // console.log([...data]);
    const res = await updateProfile(data);
    return res.data;
  },
);

// Async action to change admin password
export const changePassword = createAsyncThunk(
  "/admin/changePassword",
  async (data) => {
    const res = await changeAdminPassword(data);
    return res.data;
  },
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAdminProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loggedInUserSlice.reducer;
