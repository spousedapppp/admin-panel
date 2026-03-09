import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminData } from "../../api/api";

// Async action to fetch data
export const fetchData = createAsyncThunk("/admin/profile", async () => {
  const res = await getAdminData();
  return res.data;
});

export const initialState = {
  value: false,
  data: {},
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

const loggedInUser = createSlice({
  name: "Get LoggedIn User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the fetched data to the state
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export default loggedInUser.reducer;
