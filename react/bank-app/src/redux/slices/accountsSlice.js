import { createSlice } from "@reduxjs/toolkit";

const accountsSlice = createSlice({
  name: "accounts",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
});

export default accountsSlice.reducer;
