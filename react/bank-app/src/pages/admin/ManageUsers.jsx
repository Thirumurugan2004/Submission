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
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../redux/slices/admin/userAdminSlice";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const { list, reload } = useSelector((s) => s.userAdmin);

  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showMessage = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  // Form fields
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    isActive: true
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (reload) dispatch(fetchUsers());
  }, [reload, dispatch]);

  // OPEN CREATE DIALOG
  const handleCreate = () => {
    setForm({
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      isActive: true
    });
    setEditMode(false);
    setOpenForm(true);
  };

  // OPEN EDIT DIALOG
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

  // SUBMIT
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(
          updateUser({
            id: selectedUser.userId,
            data: form
          })
        ).unwrap();

        showMessage("User updated successfully");
      } else {
        await dispatch(createUser(form)).unwrap();
        showMessage("User created successfully");
      }
    } catch (err) {
      showMessage("Operation failed", "error");
    }

    setOpenForm(false);
  };

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      showMessage("User deleted successfully");
    } catch (err) {
      showMessage("Delete failed!", "error");
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={handleCreate}>
          CREATE USER
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}

            {list.map((u) => (
              <TableRow key={u.userId}>
                <TableCell>{u.userId}</TableCell>
                <TableCell>{u.fullName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phoneNumber || "-"}</TableCell>
                <TableCell>{u.dateOfBirth?.split("T")[0] || "-"}</TableCell>
                <TableCell>{u.isActive ? "Yes" : "No"}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleEdit(u)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(u.userId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* CREATE/EDIT FORM */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editMode ? "Edit User" : "Create User"}</DialogTitle>

        <DialogContent>
          <TextField fullWidth margin="dense" label="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })} />

          <TextField fullWidth margin="dense" label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <TextField fullWidth margin="dense" label="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />

          <TextField fullWidth type="date" margin="dense" label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />

          {!editMode && (
            <TextField fullWidth margin="dense" type="password" label="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          )}
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
