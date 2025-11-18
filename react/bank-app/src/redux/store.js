import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import accountsReducer from "./slices/accountsSlice";
import transactionsReducer from "./slices/transactionsSlice";
import userAdminReducer from "./slices/admin/userAdminSlice";
import bankAdminReducer from "./slices/admin/bankAdminSlice";
import branchAdminReducer from "./slices/admin/branchAdminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,   // REQUIRED
    userAdmin: userAdminReducer,
    bankAdmin: bankAdminReducer,
    branchAdmin: branchAdminReducer,
  },
});
    