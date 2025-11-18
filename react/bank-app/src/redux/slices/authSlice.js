import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await api.post("/login", { username, password });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return true;
});

const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loginUser.fulfilled, (s, a) => {
      s.token = a.payload.accessToken;
      s.user = a.payload.user;
      localStorage.setItem("token", a.payload.accessToken);
    });
    b.addCase(logoutUser.fulfilled, (s) => {
      s.token = null;
      s.user = null;
    });
  },
});

export default slice.reducer;
