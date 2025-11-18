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
  CircularProgress,
  Alert
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranches,
  createBranch,
  updateBranch,
  deleteBranch
} from "../../redux/slices/admin/branchAdminSlice";

export default function ManageBranches() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.branchAdmin);

  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [form, setForm] = useState({
    bankId: "",
    branchCode: "",
    branchName: "",
    ifscCode: "",
    address: "",
    city: "",
    state: "",
    country: ""
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setForm({
      bankId: "",
      branchCode: "",
      branchName: "",
      ifscCode: "",
      address: "",
      city: "",
      state: "",
      country: ""
    });
    setEditMode(false);
    setOpenForm(true);
  };

  const handleOpenEdit = (branch) => {
    setForm({
      bankId: branch.bankId,
      branchCode: branch.branchCode,
      branchName: branch.branchName,
      ifscCode: branch.ifscCode,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      country: branch.country
    });
    setSelectedBranch(branch);
    setEditMode(true);
    setOpenForm(true);
  };

  const validateForm = () => {
    if (!form.bankId || !form.branchCode || !form.branchName || !form.ifscCode) {
      alert("Bank ID, Branch Code, Branch Name, and IFSC Code are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = { ...form, bankId: Number(form.bankId) };

    if (editMode) {
      await dispatch(updateBranch({ branchId: selectedBranch.branchId, data: payload }));
    } else {
      await dispatch(createBranch(payload));
      // Optional: Refetch to ensure consistency with DB
      await dispatch(fetchBranches());
    }

    setOpenForm(false);
    setSelectedBranch(null);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteBranch(id));
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Branches</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          CREATE BRANCH
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Bank ID</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>IFSC</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((b) => (
                <TableRow key={b.branchId}>
                  <TableCell>{b.branchId}</TableCell>
                  <TableCell>{b.bankId}</TableCell>
                  <TableCell>{b.branchCode}</TableCell>
                  <TableCell>{b.branchName}</TableCell>
                  <TableCell>{b.ifscCode}</TableCell>
                  <TableCell>{b.address}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>{b.state}</TableCell>
                  <TableCell>{b.country}</TableCell>

                  <TableCell align="right">
                    <IconButton aria-label="edit branch" onClick={() => handleOpenEdit(b)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete branch" onClick={() => handleDelete(b.branchId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {list.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No branches available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* FORM DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Branch" : "Create Branch"}</DialogTitle>

        <DialogContent>
          <TextField fullWidth margin="dense" label="Bank ID" type="number"
            value={form.bankId}
            onChange={(e) => setForm({ ...form, bankId: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="Branch Code"
            value={form.branchCode}
            onChange={(e) => setForm({ ...form, branchCode: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="Branch Name"
            value={form.branchName}
            onChange={(e) => setForm({ ...form, branchName: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="IFSC Code"
            value={form.ifscCode}
            onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />

          <TextField fullWidth margin="dense" label="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {editMode ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}