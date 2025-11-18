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
  Alert,
  Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/AddCircle";
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

  const emptyForm = {
    bankId: "",
    branchCode: "",
    branchName: "",
    ifscCode: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setForm(emptyForm);
    setEditMode(false);
    setOpenForm(true);
  };

  const handleOpenEdit = (branch) => {
    setForm({ ...branch });
    setSelectedBranch(branch);
    setEditMode(true);
    setOpenForm(true);
  };

  const handleSubmit = async () => {
    const payload = { ...form, bankId: Number(form.bankId) };

    if (editMode) {
      await dispatch(updateBranch({ branchId: selectedBranch.branchId, data: payload }));
    } else {
      await dispatch(createBranch(payload));
    }

    dispatch(fetchBranches());
    setOpenForm(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteBranch(id));
    dispatch(fetchBranches());
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Branches
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            px: 3,
            py: 1
          }}
        >
          Create Branch
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* TABLE */}
      <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Bank ID</strong></TableCell>
                <TableCell><strong>Code</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>IFSC</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>City</strong></TableCell>
                <TableCell><strong>State</strong></TableCell>
                <TableCell><strong>Country</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((b) => (
                <TableRow key={b.branchId} hover sx={{ height: "60px" }}>
                  <TableCell>{b.branchId}</TableCell>
                  <TableCell>{b.bankId}</TableCell>
                  <TableCell>{b.branchCode}</TableCell>

                  {/* WRAP LONG TEXT */}
                  <TableCell sx={{ whiteSpace: "normal", maxWidth: 160 }}>
                    {b.branchName}
                  </TableCell>

                  <TableCell>{b.ifscCode}</TableCell>
                  <TableCell>{b.address}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>{b.state}</TableCell>
                  <TableCell>{b.country}</TableCell>

                  <TableCell>{b.createdAt?.split("T")[0]}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleOpenEdit(b)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(b.branchId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No branches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* FORM DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editMode ? "Edit Branch" : "Create Branch"}
        </DialogTitle>

        <DialogContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>
            <TextField
              label="Bank ID"
              type="number"
              value={form.bankId}
              onChange={(e) => setForm({ ...form, bankId: e.target.value })}
            />

            <TextField
              label="Branch Code"
              value={form.branchCode}
              onChange={(e) => setForm({ ...form, branchCode: e.target.value })}
            />

            <TextField
              label="Branch Name"
              fullWidth
              value={form.branchName}
              onChange={(e) => setForm({ ...form, branchName: e.target.value })}
            />

            <TextField
              label="IFSC Code"
              fullWidth
              value={form.ifscCode}
              onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
            />

            <TextField
              label="Address"
              fullWidth
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <TextField
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <TextField
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />

            <TextField
              label="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ textTransform: "none", px: 3 }}
          >
            {editMode ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
