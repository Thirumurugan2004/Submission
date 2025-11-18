import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TableContainer,
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
  IconButton,
  Box,
  Snackbar,
  Alert,
  Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddCircle";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanks,
  createBank,
  updateBank,
  deleteBank
} from "../../redux/slices/admin/bankAdminSlice";

export default function ManageBanks() {
  const dispatch = useDispatch();
  const { list, reload } = useSelector((s) => s.bankAdmin);

  const emptyForm = {
    bankName: "",
    headOfficeAddress: "",
    establishedDate: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showMessage = (msg, severity = "success") => {
    setSnack({ open: true, message: msg, severity });
  };

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (reload) dispatch(fetchBanks());
  }, [reload, dispatch]);

  const handleCreate = () => {
    setForm(emptyForm);
    setEditMode(false);
    setOpenForm(true);
  };

  const handleEdit = (b) => {
    setSelectedBank(b);
    setForm({
      bankName: b.bankName,
      headOfficeAddress: b.headOfficeAddress,
      establishedDate: b.establishedDate ? b.establishedDate.split("T")[0] : ""
    });
    setEditMode(true);
    setOpenForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(updateBank({ id: selectedBank.bankId, data: form })).unwrap();
        showMessage("Bank updated successfully");
      } else {
        await dispatch(createBank(form)).unwrap();
        showMessage("Bank created successfully");
      }
      setOpenForm(false);
    } catch (err) {
      showMessage("Operation failed", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBank(id)).unwrap();
      showMessage("Bank deleted successfully");
    } catch (err) {
      showMessage("Failed to delete bank", "error");
    }
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Banks
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            px: 3,
            py: 1
          }}
        >
          Create Bank
        </Button>
      </Box>

      {/* TABLE */}
      <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Bank Name</strong></TableCell>
                <TableCell><strong>Head Office</strong></TableCell>
                <TableCell><strong>Established</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No banks found
                  </TableCell>
                </TableRow>
              )}

              {list.map((b) => (
                <TableRow key={b.bankId} hover sx={{ height: 60 }}>
                  <TableCell>{b.bankId}</TableCell>

                  <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>
                    {b.bankName}
                  </TableCell>

                  <TableCell sx={{ maxWidth: 220, whiteSpace: "normal" }}>
                    {b.headOfficeAddress}
                  </TableCell>

                  <TableCell>
                    {b.establishedDate ? b.establishedDate.split("T")[0] : "-"}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(b)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(b.bankId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

      {/* FORM DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editMode ? "Edit Bank" : "Create Bank"}
        </DialogTitle>

        <DialogContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>

            <TextField
              label="Bank Name"
              value={form.bankName}
              fullWidth
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            />

            <TextField
              label="Established Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.establishedDate}
              onChange={(e) => setForm({ ...form, establishedDate: e.target.value })}
            />

            <TextField
              label="Head Office Address"
              fullWidth
              multiline
              rows={2}
              sx={{ gridColumn: "span 2" }}
              value={form.headOfficeAddress}
              onChange={(e) => setForm({ ...form, headOfficeAddress: e.target.value })}
            />

          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" sx={{ px: 3 }} onClick={handleSubmit}>
            {editMode ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert variant="filled" severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
