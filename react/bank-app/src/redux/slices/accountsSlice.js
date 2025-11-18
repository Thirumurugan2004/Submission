// src/redux/slices/accountsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const BASE = "/accounts";

// GET accounts of logged in user
export const fetchMyAccounts = createAsyncThunk(
  "accounts/fetchMyAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE}/my`);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load accounts");
    }
  }
);

// CREATE account
export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE}/${userId}/create`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue("Error creating account");
    }
  }
);

// CLOSE account
export const closeAccount = createAsyncThunk(
  "accounts/closeAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      const res = await api.put(`${BASE}/${accountId}/close`);
      return { accountId, data: res.data };
    } catch (err) {
      return rejectWithValue("Error closing account");
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    list: [],
    loading: false,
    error: null,
    reload: false // triggers UI reload
  },
  reducers: {},
  extraReducers: (b) => {

    // -------------------
    // LOAD ACCOUNTS
    // -------------------
    b.addCase(fetchMyAccounts.pending, (s) => { 
      s.loading = true; 
      s.error = null; 
    });

    b.addCase(fetchMyAccounts.fulfilled, (s, a) => {
      s.loading = false;
      s.list = a.payload;
      s.reload = false; 
    });

    b.addCase(fetchMyAccounts.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });

    // -------------------
    // CREATE -> refresh
    // -------------------
    b.addCase(createAccount.fulfilled, (s) => {
      s.reload = true;
    });

    // -------------------
    // CLOSE -> refresh
    // -------------------
    b.addCase(closeAccount.fulfilled, (s) => {
      s.reload = true;
    });
  }
});

export default accountsSlice.reducer;
