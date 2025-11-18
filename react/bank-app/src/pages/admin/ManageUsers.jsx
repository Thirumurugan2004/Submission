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
  Tooltip,
  FormControlLabel,
  Switch
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddCircle";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../redux/slices/admin/userAdminSlice";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const { list, reload } = useSelector((s) => s.userAdmin);

  const emptyForm = {
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    isActive: true
  };

  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showMessage = (msg, severity = "success") => {
    setSnack({ open: true, message: msg, severity });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (reload) dispatch(fetchUsers());
  }, [reload, dispatch]);

  const handleCreate = () => {
    setForm(emptyForm);
    setEditMode(false);
    setOpenForm(true);
  };

  const handleEdit = (u) => {
    setSelectedUser(u);
    setForm({
      fullName: u.fullName,
      email: u.email,
      phoneNumber: u.phoneNumber || "",
      dateOfBirth: u.dateOfBirth?.split("T")[0] || "",
      password: "",
      isActive: u.isActive
    });
    setEditMode(true);
    setOpenForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(updateUser({ id: selectedUser.userId, data: form })).unwrap();
        showMessage("User updated successfully");
      } else {
        await dispatch(createUser(form)).unwrap();
        showMessage("User created successfully");
      }
      setOpenForm(false);
    } catch (err) {
      showMessage("Operation failed", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      showMessage("User deleted successfully");
    } catch (err) {
      showMessage("Delete failed!", "error");
    }
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Users
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
          Create User
        </Button>
      </Box>

      {/* TABLE */}
      <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>DOB</strong></TableCell>
                <TableCell><strong>Active</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No users found
                  </TableCell>
                </TableRow>
              )}

              {list.map((u) => (
                <TableRow key={u.userId} hover sx={{ height: 60 }}>
                  <TableCell>{u.userId}</TableCell>
                  <TableCell>{u.fullName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phoneNumber || "-"}</TableCell>
                  <TableCell>{u.dateOfBirth?.split("T")[0] || "-"}</TableCell>
                  <TableCell>{u.isActive ? "Yes" : "No"}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(u)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(u.userId)}>
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
          {editMode ? "Edit User" : "Create User"}
        </DialogTitle>

        <DialogContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>

            <TextField
              label="Full Name"
              fullWidth
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <TextField
              label="Phone Number"
              fullWidth
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />

            <TextField
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={form.dateOfBirth}
              onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            />

            {!editMode && (
              <TextField
                label="Password"
                type="password"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            )}

            <Box sx={{ gridColumn: "span 2" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                  />
                }
                label="Active User"
              />
            </Box>

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
