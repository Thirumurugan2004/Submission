import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
});

export default transactionsSlice.reducer;
