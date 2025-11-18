// src/redux/slices/admin/bankAdminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

const BASE = "/banks";

// ================= API CALLS =====================

// GET ALL BANKS
export const fetchBanks = createAsyncThunk(
  "bankAdmin/fetchBanks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(BASE);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load banks");
    }
  }
);

// CREATE BANK
export const createBank = createAsyncThunk(
  "bankAdmin/createBank",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        bankName: data.bankName,
        headOfficeAddress: data.headOfficeAddress,
        establishedDate: data.establishedDate
          ? data.establishedDate + "T00:00:00.000Z"
          : null
      };

      const res = await api.post(`${BASE}/create`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue("Error creating bank");
    }
  }
);

// UPDATE BANK
export const updateBank = createAsyncThunk(
  "bankAdmin/updateBank",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payload = {
        bankName: data.bankName,
        headOfficeAddress: data.headOfficeAddress,
        establishedDate: data.establishedDate
          ? data.establishedDate + "T00:00:00.000Z"
          : null
      };

      const res = await api.put(`${BASE}/${id}/update`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue("Error updating bank");
    }
  }
);

// DELETE BANK
export const deleteBank = createAsyncThunk(
  "bankAdmin/deleteBank",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}/delete`);
      return { id };
    } catch (err) {
      return rejectWithValue("Error deleting bank");
    }
  }
);

// ================= SLICE =========================

const bankAdminSlice = createSlice({
  name: "bankAdmin",
  initialState: {
    list: [],
    loading: false,
    error: null,
    reload: false
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH BANKS
      .addCase(fetchBanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.reload = false;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createBank.fulfilled, (state) => {
        state.reload = true;
      })

      // UPDATE
      .addCase(updateBank.fulfilled, (state) => {
        state.reload = true;
      })

      // DELETE
      .addCase(deleteBank.fulfilled, (state) => {
        state.reload = true;
      });
  },
});

export default bankAdminSlice.reducer;
