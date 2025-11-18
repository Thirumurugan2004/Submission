import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// LOGIN
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/login", data);

    // normalize API response
    return {
      token: res.data.accessToken,
      user: {
        id: res.data.user.userId,
        name: res.data.user.fullName,
        email: res.data.user.email,
        roles: res.data.user.roles,        // array: ["Admin", "User"]
        role: res.data.user.roles[0] || "", // pick first role
      }
    };

  } catch (err) {
    return thunkAPI.rejectWithValue("Invalid username or password");
  }
});

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  try { await api.post("/logout"); } catch {}
  localStorage.clear();
});

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken || null,
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })

      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;

        // Save to localStorage
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("user", JSON.stringify(a.payload.user));
      })

      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(logout.fulfilled, (s) => {
        s.token = null;
        s.user = null;
      });
  },
});

export default authSlice.reducer;
