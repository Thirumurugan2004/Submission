import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

const BASE = "/user";

// ================== API CALLS ======================

// GET ALL USERS
export const fetchUsers = createAsyncThunk(
  "userAdmin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE}/all`);
      return res.data;
    } catch (err) {
      console.log("FETCH USERS ERROR:", err.response?.data);
      return rejectWithValue("Failed to load users");
    }
  }
);

// CREATE USER
export const createUser = createAsyncThunk(
  "userAdmin/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth + "T00:00:00.000Z"
          : null
      };

      console.log("CREATE USER PAYLOAD:", payload);

      const res = await api.post(`${BASE}/create`, payload);
      return res.data;
    } catch (err) {
      console.log("CREATE USER ERROR:", err.response?.data);
      return rejectWithValue("Error creating user");
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "userAdmin/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        isActive: data.isActive,
        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth + "T00:00:00.000Z"
          : null
      };

      console.log("UPDATE USER PAYLOAD:", payload);

      const res = await api.put(`${BASE}/update?id=${id}`, payload);
      return res.data;
    } catch (err) {
      console.log("UPDATE USER ERROR:", err.response?.data);
      return rejectWithValue("Error updating user");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "userAdmin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE}/${id}/delete`);
      return { id };
    } catch (err) {
      console.log("DELETE USER ERROR:", err.response?.data);
      return rejectWithValue("Error deleting user");
    }
  }
);

// ================== SLICE ============================

const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    list: [],
    loading: false,
    error: null,
    reload: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.reload = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createUser.fulfilled, (state) => {
        state.reload = true;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state) => {
        state.reload = true;
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state) => {
        state.reload = true;
      });
  },
});

export default userAdminSlice.reducer;
