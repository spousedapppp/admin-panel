import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactions } from "../../api/api";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async ({ search, page, limit, type }) => {
    const res = await getTransactions({ search, page, limit, type });
    return res.data;
  },
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: {
      transactions: [],
      totalTransactions: 0,
    },
    status: "idle",
    error: null,
    filters: {
      search: "",
      page: 1,
      type: "",
      limit: 10,
    },
  },
  reducers: {
    setTransactionFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTransactionFilter } = transactionsSlice.actions;
export default transactionsSlice.reducer;
