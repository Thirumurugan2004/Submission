import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// GET ALL BRANCHES
export const fetchBranches = createAsyncThunk(
  "admin/fetchBranches",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/branches");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error loading branches");
    }
  }
);

// CREATE BRANCH
export const createBranch = createAsyncThunk(
  "admin/createBranch",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/branches/create", data);
      return res.data; // likely returns branchId only
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error creating branch");
    }
  }
);

// UPDATE BRANCH
export const updateBranch = createAsyncThunk(
  "admin/updateBranch",
  async ({ branchId, data }, thunkAPI) => {
    try {
      const res = await api.put(`/branches/${branchId}/update`, data);
      return res.data; // may return minimal info
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error updating branch");
    }
  }
);

// DELETE BRANCH
export const deleteBranch = createAsyncThunk(
  "admin/deleteBranch",
  async (branchId, thunkAPI) => {
    try {
      await api.delete(`/branches/${branchId}/delete`);
      return branchId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error deleting branch");
    }
  }
);

const branchAdminSlice = createSlice({
  name: "branchAdmin",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchBranches.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // CREATE
    builder.addCase(createBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBranch.fulfilled, (state, action) => {
      state.loading = false;
      const newBranch = { ...action.meta.arg, branchId: action.payload.branchId };
      state.list.push(newBranch);
    });
    builder.addCase(createBranch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // UPDATE
    builder.addCase(updateBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBranch.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.list.findIndex((x) => x.branchId === action.meta.arg.branchId);
      if (index !== -1) {
        state.list[index] = { ...action.meta.arg.data, branchId: action.meta.arg.branchId };
      }
    });
    builder.addCase(updateBranch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // DELETE
    builder.addCase(deleteBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.filter((b) => b.branchId !== action.payload);
    });
    builder.addCase(deleteBranch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default branchAdminSlice.reducer;