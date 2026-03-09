import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/api";

// Async action to fetch data
export const fetchData = createAsyncThunk(
  "/admin/allusers",
  async ({ search, page, status, type, limit }) => {
    const res = await getAllUsers({ search, page, status, type, limit });
    return res.data;
  },
);

export const initialState = {
  value: false,
  data: {
    users: [],
    totalUsers: 0,
  },
  status: "idle", // to handle loading state
  error: null, // to handle error state
  filters: {
    search: "",
    page: 1,
    status: "",
    type: "",
    limit: 10, // default limit
  },
};

export const cardsSlice = createSlice({
  name: "Get All Users",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const newFilters = { ...state.filters, ...action.payload };
      if (JSON.stringify(state.filters) !== JSON.stringify(newFilters)) {
        state.filters = newFilters;
      }
    },
  },
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
export const { setFilter } = cardsSlice.actions;

export default cardsSlice.reducer;
