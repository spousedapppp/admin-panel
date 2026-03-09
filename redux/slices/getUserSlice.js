import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../api/api";

// Async action to fetch data
export const fetchData = createAsyncThunk("/admin/getUser", async (userId) => {
  const res = await getUser(userId);
  return res.data;
});

export const initialState = {
  value: false,
  data: {},
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const userSlice = createSlice({
  name: "Get specific User",
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
export default userSlice.reducer;
