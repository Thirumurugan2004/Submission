// src/redux/slices/transactionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const BASE = "/transactions";

// Deposit
export const depositToAccount = createAsyncThunk(
  "tx/deposit",
  async ({ accountId, amount, remarks }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE}/${accountId}/deposit`, { amount, remarks });
      return res.data;
    } catch (err) {
      console.log("deposit err", err.response?.data || err);
      return rejectWithValue("Deposit failed");
    }
  }
);

// Withdraw
export const withdrawFromAccount = createAsyncThunk(
  "tx/withdraw",
  async ({ accountId, amount, remarks }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE}/${accountId}/withdraw`, { amount, remarks });
      return res.data;
    } catch (err) {
      console.log("withdraw err", err.response?.data || err);
      return rejectWithValue("Withdraw failed");
    }
  }
);

// Transfer
export const transferBetweenAccounts = createAsyncThunk(
  "tx/transfer",
  async ({ fromAccountId, toAccountId, amount, remarks }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE}/transfer`, {
        fromAccountId,
        toAccountId,
        amount,
        remarks,
      });
      return res.data;
    } catch (err) {
      console.log("transfer err", err.response?.data || err);
      return rejectWithValue("Transfer failed");
    }
  }
);

// History
export const fetchTransactionHistory = createAsyncThunk(
  "tx/fetchHistory",
  async ({ accountId, fromDate, toDate }, { rejectWithValue }) => {
    try {
      let url = `${BASE}/${accountId}/history`;

      const params = [];
      if (fromDate) params.push(`from=${encodeURIComponent(fromDate)}`);
      if (toDate) params.push(`to=${encodeURIComponent(toDate)}`);

      if (params.length) url += `?${params.join("&")}`;

      const res = await api.get(url);
      return res.data;
    } catch (err) {
      console.log("fetchHistory err", err.response?.data || err);
      return rejectWithValue("Failed to load history");
    }
  }
);

// Recent
export const fetchRecentTransactions = createAsyncThunk(
  "tx/fetchRecent",
  async (accountId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE}/${accountId}/recent`);
      return res.data;
    } catch (err) {
      console.log("fetchRecent err", err.response?.data || err);
      return rejectWithValue("Failed to load recent");
    }
  }
);

const txSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    recent: [],
    loading: false,
    error: null,
    reload: false,
  },
  reducers: {
    clearHistory(state) {
      state.list = [];
      state.recent = [];
    },
  },
  extraReducers: (b) => {
    b.addCase(depositToAccount.fulfilled, (s) => (s.reload = true));
    b.addCase(withdrawFromAccount.fulfilled, (s) => (s.reload = true));
    b.addCase(transferBetweenAccounts.fulfilled, (s) => (s.reload = true));

    b.addCase(fetchTransactionHistory.pending, (s) => {
      s.loading = true;
    });
    b.addCase(fetchTransactionHistory.fulfilled, (s, a) => {
      s.loading = false;
      s.list = a.payload;
      s.reload = false;
    });
    b.addCase(fetchTransactionHistory.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });

    b.addCase(fetchRecentTransactions.fulfilled, (s, a) => {
      s.recent = a.payload;
    });
  },
});

export const { clearHistory } = txSlice.actions;
export default txSlice.reducer;
