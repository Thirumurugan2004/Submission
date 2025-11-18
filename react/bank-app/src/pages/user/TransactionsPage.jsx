// src/pages/user/TransactionsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTransactionHistory,
  fetchRecentTransactions,
  clearHistory,
} from "../../redux/slices/transactionsSlice";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const tx = useSelector((s) => s.transactions);

  const [accountId, setAccountId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Convert UI date → ISO format for backend
  const convertToISO = (date, end = false) => {
    if (!date) return null;
    return end ? `${date}T23:59:59.000Z` : `${date}T00:00:00.000Z`;
  };

  // Fetch button
  const handleFetch = () => {
    const id = Number(accountId);

    if (!accountId.trim() || isNaN(id) || id <= 0) {
      alert("Please enter a valid Account ID");
      return;
    }

    dispatch(
      fetchTransactionHistory({
        accountId: id,
        fromDate: convertToISO(fromDate),
        toDate: convertToISO(toDate, true),
      })
    );

    dispatch(fetchRecentTransactions(id));
  };

  // Clear when input empty
  useEffect(() => {
    if (!accountId.trim()) {
      dispatch(clearHistory());
    }
  }, [accountId, dispatch]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2}>
          <TextField
            label="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />

          <TextField
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <Button variant="contained" onClick={handleFetch}>
            Fetch
          </Button>
        </Box>
      </Paper>

      {/* RECENT */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Recent Transactions</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Performed By</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tx.recent.map((t) => (
              <TableRow key={t.transactionId}>
                <TableCell>{t.transactionDate?.split("T")[0]}</TableCell>
                <TableCell>{t.transactionType}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>{t.remarks}</TableCell>
                <TableCell>{t.performedByUser || "-"}</TableCell>
              </TableRow>
            ))}

            {tx.recent.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No recent transactions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* HISTORY */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Transaction History</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Reference</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tx.list.map((t) => (
              <TableRow key={t.transactionId}>
                <TableCell>{t.transactionDate?.split("T")[0]}</TableCell>
                <TableCell>{t.transactionType}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>{t.remarks}</TableCell>
                <TableCell>{t.referenceNumber || "-"}</TableCell>
              </TableRow>
            ))}

            {tx.list.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No transactions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
