import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReports, unblockUser } from "../../api/api";

export const fetchReports = createAsyncThunk(
  "reports/fetch",
  async ({ search, page, limit }) => {
    const res = await getReports({ search, page, limit });
    return res.data;
  },
);

export const removeBlock = createAsyncThunk(
  "reports/unblock",
  async (blockId) => {
    await unblockUser(blockId);
    return blockId;
  },
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    data: {
      reports: [],
      totalReports: 0,
    },
    status: "idle",
    error: null,
    filters: {
      search: "",
      page: 1,
      limit: 10,
    },
  },
  reducers: {
    setReportFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeBlock.fulfilled, (state, action) => {
        state.data.reports = state.data.reports.filter(
          (r) => r._id !== action.payload,
        );
        state.data.totalReports -= 1;
      });
  },
});

export const { setReportFilter } = reportsSlice.actions;
export default reportsSlice.reducer;
