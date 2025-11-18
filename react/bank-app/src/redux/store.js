import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import accountsReducer from "./slices/accountsSlice";
import transactionsReducer from "./slices/transactionsSlice";
import bankAdminReducer from "./slices/admin/bankAdminSlice";
import branchAdminReducer from "./slices/admin/branchAdminSlice";
import userAdminReducer from "./slices/admin/userAdminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
    bankAdmin: bankAdminReducer,
    branchAdmin: branchAdminReducer,
    userAdmin: userAdminReducer,
  },
});
