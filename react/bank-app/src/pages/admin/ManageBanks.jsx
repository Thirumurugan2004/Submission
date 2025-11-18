import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Table, TableHead, TableCell,
  TableRow, TableBody, Button, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, IconButton, Box,
  Snackbar, Alert
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showMessage = (msg, severity = "success") => {
    setSnack({ open: true, message: msg, severity });
  };

  // Bank Form
  const [form, setForm] = useState({
    bankName: "",
    headOfficeAddress: "",
    establishedDate: ""
  });

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (reload) dispatch(fetchBanks());
  }, [reload, dispatch]);

  // OPEN CREATE FORM
  const handleCreate = () => {
    setForm({
      bankName: "",
      headOfficeAddress: "",
      establishedDate: ""
    });
    setEditMode(false);
    setOpenForm(true);
  };

  // OPEN EDIT FORM
  const handleEdit = (b) => {
    setSelectedBank(b);
    setForm({
      bankName: b.bankName,
      headOfficeAddress: b.headOfficeAddress,
      establishedDate: b.establishedDate
        ? b.establishedDate.split("T")[0]
        : ""
    });
    setEditMode(true);
    setOpenForm(true);
  };

  // SUBMIT CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(
          updateBank({ id: selectedBank.bankId, data: form })
        ).unwrap();

        showMessage("Bank updated successfully");
      } else {
        await dispatch(createBank(form)).unwrap();
        showMessage("Bank created successfully");
      }
    } catch (err) {
      showMessage("Operation failed", "error");
    }

    setOpenForm(false);
  };

  // DELETE BANK
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBank(id)).unwrap();
      showMessage("Bank deleted successfully");
    } catch (err) {
      showMessage("Failed to delete bank", "error");
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Banks</Typography>
        <Button variant="contained" onClick={handleCreate}>
          CREATE BANK
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Head Office</TableCell>
              <TableCell>Established</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No banks found
                </TableCell>
              </TableRow>
            )}

            {list.map((b) => (
              <TableRow key={b.bankId}>
                <TableCell>{b.bankId}</TableCell>
                <TableCell>{b.bankName}</TableCell>
                <TableCell>{b.headOfficeAddress}</TableCell>

                <TableCell>
                  {b.establishedDate
                    ? b.establishedDate.split("T")[0]
                    : "-"}
                </TableCell>

                <TableCell>
                  <IconButton onClick={() => handleEdit(b)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(b.bankId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>

      {/* FORM */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editMode ? "Edit Bank" : "Create Bank"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth margin="dense" label="Bank Name"
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          />

          <TextField
            fullWidth margin="dense" label="Head Office Address"
            value={form.headOfficeAddress}
            onChange={(e) =>
              setForm({ ...form, headOfficeAddress: e.target.value })
            }
          />

          <TextField
            fullWidth type="date" margin="dense" label="Established Date"
            value={form.establishedDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setForm({ ...form, establishedDate: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? "Update" : "Create"}
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
