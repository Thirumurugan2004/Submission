import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SendIcon from "@mui/icons-material/Send";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyAccounts,
  createAccount,
  closeAccount,
} from "../../redux/slices/accountsSlice";

import {
  depositToAccount,
  withdrawFromAccount,
  transferBetweenAccounts,
  fetchRecentTransactions,
} from "../../redux/slices/transactionsSlice";

export default function AccountsPage() {
  const dispatch = useDispatch();

  // ========================
  // AUTH -> Get userId
  // ========================
  const { user } = useSelector((s) => s.auth);
  const userId = user?.userId; // Correct always

  const { list, reload } = useSelector((s) => s.accounts);
  const txReload = useSelector((s) => s.transactions.reload);

  // ========================
  // Snackbar
  // ========================
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (msg, severity = "success") => {
    setSnack({ open: true, message: msg, severity });
  };

  // ========================
  // Load accounts on page load
  // ========================
  useEffect(() => {
    dispatch(fetchMyAccounts());
  }, []);

  // Refresh when redux reload flag changes
  useEffect(() => {
    if (reload) dispatch(fetchMyAccounts());
  }, [reload]);

  // Refresh after any transaction
  useEffect(() => {
    if (txReload) dispatch(fetchMyAccounts());
  }, [txReload]);

  // ===============================================================
  // CREATE ACCOUNT
  // ===============================================================
  const [openCreate, setOpenCreate] = useState(false);

  const [createForm, setCreateForm] = useState({
    branchId: "",
    accountType: "Savings",
    currencyCode: "INR",
    initialBalance: 0,
    interestRate: 0,
  });

  const handleCreate = async () => {
    try {
      await dispatch(
        createAccount({
          userId,
          data: {
            branchId: Number(createForm.branchId),
            accountType: createForm.accountType,
            currencyCode: createForm.currencyCode,
            initialBalance: Number(createForm.initialBalance),
            interestRate: Number(createForm.interestRate),
          },
        })
      ).unwrap();

      showMessage("Account created successfully");
      setOpenCreate(false);
    } catch (err) {
      showMessage("Failed to create account", "error");
    }
  };

  // ===============================================================
  // TRANSACTION HANDLERS
  // ===============================================================
  const [activeAccountId, setActiveAccountId] = useState(null);
  const [txForm, setTxForm] = useState({ amount: 0, remarks: "" });

  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const handleDeposit = async () => {
    try {
      await dispatch(
        depositToAccount({
          accountId: activeAccountId,
          amount: Number(txForm.amount),
          remarks: txForm.remarks,
        })
      ).unwrap();

      showMessage("Deposit successful");
      setOpenDeposit(false);

      dispatch(fetchMyAccounts());
      dispatch(fetchRecentTransactions(activeAccountId));
    } catch {
      showMessage("Deposit failed", "error");
    }
  };

  const handleWithdraw = async () => {
    try {
      await dispatch(
        withdrawFromAccount({
          accountId: activeAccountId,
          amount: Number(txForm.amount),
          remarks: txForm.remarks,
        })
      ).unwrap();

      showMessage("Withdraw successful");
      setOpenWithdraw(false);

      dispatch(fetchMyAccounts());
      dispatch(fetchRecentTransactions(activeAccountId));
    } catch {
      showMessage("Withdraw failed", "error");
    }
  };

  // ===============================================================
  // TRANSFER
  // ===============================================================
  const [openTransfer, setOpenTransfer] = useState(false);
  const [transferForm, setTransferForm] = useState({
    fromAccountId: null,
    toAccountId: "",
    amount: 0,
    remarks: "",
  });

  const handleTransfer = async () => {
    try {
      await dispatch(
        transferBetweenAccounts({
          fromAccountId: Number(transferForm.fromAccountId),
          toAccountId: Number(transferForm.toAccountId),
          amount: Number(transferForm.amount),
          remarks: transferForm.remarks,
        })
      ).unwrap();

      showMessage("Transfer successful");
      setOpenTransfer(false);

      dispatch(fetchMyAccounts());
    } catch {
      showMessage("Transfer failed", "error");
    }
  };

  // ===============================================================
  // CLOSE ACCOUNT
  // ===============================================================
  const handleCloseAccount = async (accountId) => {
    try {
      await dispatch(closeAccount(accountId)).unwrap();
      showMessage("Account closed successfully");
      dispatch(fetchMyAccounts());
    } catch {
      showMessage("Failed to close account", "error");
    }
  };

  // ===============================================================
  // UI
  // ===============================================================
  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">My Accounts</Typography>
        <Button variant="contained" onClick={() => setOpenCreate(true)}>
          Open New Account
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((a) => (
              <TableRow key={a.accountId}>
                <TableCell>{a.accountNumber}</TableCell>
                <TableCell>{a.accountType}</TableCell>
                <TableCell>{a.balance}</TableCell>
                <TableCell>{a.branchName}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    startIcon={<ArrowDownwardIcon />}
                    onClick={() => {
                      setActiveAccountId(a.accountId);
                      setTxForm({ amount: 0, remarks: "" });
                      setOpenDeposit(true);
                    }}
                  >
                    Deposit
                  </Button>

                  <Button
                    size="small"
                    startIcon={<ArrowUpwardIcon />}
                    onClick={() => {
                      setActiveAccountId(a.accountId);
                      setTxForm({ amount: 0, remarks: "" });
                      setOpenWithdraw(true);
                    }}
                  >
                    Withdraw
                  </Button>

                  <Button
                    size="small"
                    startIcon={<SendIcon />}
                    onClick={() => {
                      setTransferForm({
                        fromAccountId: a.accountId,
                        toAccountId: "",
                        amount: 0,
                        remarks: "",
                      });
                      setOpenTransfer(true);
                    }}
                  >
                    Transfer
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleCloseAccount(a.accountId)}
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {list.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No accounts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* CREATE ACCOUNT */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Open New Account</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Branch ID"
            fullWidth
            value={createForm.branchId}
            onChange={(e) =>
              setCreateForm({ ...createForm, branchId: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Account Type"
            fullWidth
            value={createForm.accountType}
            onChange={(e) =>
              setCreateForm({ ...createForm, accountType: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Currency Code"
            fullWidth
            value={createForm.currencyCode}
            onChange={(e) =>
              setCreateForm({ ...createForm, currencyCode: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Initial Balance"
            type="number"
            fullWidth
            value={createForm.initialBalance}
            onChange={(e) =>
              setCreateForm({ ...createForm, initialBalance: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Interest Rate"
            type="number"
            fullWidth
            value={createForm.interestRate}
            onChange={(e) =>
              setCreateForm({ ...createForm, interestRate: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* DEPOSIT */}
      <Dialog open={openDeposit} onClose={() => setOpenDeposit(false)}>
        <DialogTitle>Deposit</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={txForm.amount}
            onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Remarks"
            fullWidth
            value={txForm.remarks}
            onChange={(e) => setTxForm({ ...txForm, remarks: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeposit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeposit}>
            Deposit
          </Button>
        </DialogActions>
      </Dialog>

      {/* WITHDRAW */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={txForm.amount}
            onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Remarks"
            fullWidth
            value={txForm.remarks}
            onChange={(e) => setTxForm({ ...txForm, remarks: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>

      {/* TRANSFER */}
      <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)}>
        <DialogTitle>Transfer Funds</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="From Account ID"
            fullWidth
            disabled
            value={transferForm.fromAccountId}
          />

          <TextField
            margin="dense"
            label="To Account ID"
            fullWidth
            value={transferForm.toAccountId}
            onChange={(e) =>
              setTransferForm({ ...transferForm, toAccountId: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={transferForm.amount}
            onChange={(e) =>
              setTransferForm({ ...transferForm, amount: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Remarks"
            fullWidth
            value={transferForm.remarks}
            onChange={(e) =>
              setTransferForm({ ...transferForm, remarks: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenTransfer(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleTransfer}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
