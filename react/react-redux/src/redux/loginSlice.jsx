import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }) => {
    const response = await fetch("https://localhost:7220/BankCustomerAPI/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    clearForm: (state) => {
      state.username = "";
      state.password = "";
      state.userData = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setField, clearForm } = loginSlice.actions;
export default loginSlice.reducer;
