import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    email: "",
    password: "",
    submitted: false,
  },
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    submitForm: (state) => {
      state.submitted = true;
    },
    clearForm: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.submitted = false;
    },
  },
});


export const { setField, submitForm, clearForm } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;
