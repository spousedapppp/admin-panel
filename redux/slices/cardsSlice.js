import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "../../api/api"; // import your API function

// Async action to fetch data
export const fetchData = createAsyncThunk("/admin/dashboard", async () => {
  const res = await getDashboard();
  return res.data;
});

const initialState = {
  value: false,
  data: {
    users: 0,
    upgraded: 0,
    revenue: [
      {
        _id: null,
        total: 0,
      },
    ],
  },
  status: "idle", // to handle loading state
  error: null, // to handle error state
};

export const cardsSlice = createSlice({
  name: "Cancel User Subscription",
  initialState,
  reducers: {
    setCardData: (state, action) => {
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
        // Add the fetched data to the state and ensure revenue has a default value if not provided
        const fetchedData = action.payload;
        if (!fetchedData.revenue || fetchedData.revenue.length === 0) {
          fetchedData.revenue = [{ _id: null, total: 0 }];
        }
        state.data = fetchedData;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCardData } = cardsSlice.actions;

export default cardsSlice.reducer;
