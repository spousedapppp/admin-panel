import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChart, getDashboard } from "../../api/api"; // import your API function

// Async action to fetch data
export const fetchData = createAsyncThunk("/admin/earnings", async () => {
  const res = await getChart();
  console.log(res.data);
  return res.data;
});

const initialState = {
  value: false,
  data: [
    {
      _id: 1,
      total: 0,
    },
    {
      _id: 2,
      total: 0,
    },
    {
      _id: 3,
      total: 0,
    },
    {
      _id: 4,
      total: 0,
    },
    {
      _id: 5,
      total: 0,
    },
    {
      _id: 6,
      total: 0,
    },
    {
      _id: 7,
      total: 0,
    },
    {
      _id: 8,
      total: 0,
    },
    {
      _id: 9,
      total: 0,
    },
    {
      _id: 10,
      total: 0,
    },
    {
      _id: 11,
      total: 0,
    },
    {
      _id: 12,
      total: 0,
    },
  ],
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const chartSlice = createSlice({
  name: "Cancel User Subscription",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
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
export const { setData } = chartSlice.actions;

export default chartSlice.reducer;
