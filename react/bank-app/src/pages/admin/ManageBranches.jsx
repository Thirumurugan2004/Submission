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
  IconButton,
  Box,
  Snackbar,
  Alert,
  TableSortLabel
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
  const { list } = useSelector((s) => s.branchAdmin);

  const [search, setSearch] = useState("");

  // SORTING
  const [sortField, setSortField] = useState("branchId");
  const [sortOrder, setSortOrder] = useState("asc");

  // DIALOG STATES
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const showMessage = (msg, severity = "success") => {
    setSnack({ open: true, message: msg, severity });
  };

  const [form, setForm] = useState({
    bankId: "",
    branchCode: "",
    branchName: "",
    ifscCode: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // SEARCH FILTER
  const filtered = list.filter((b) =>
    Object.values(b)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // SORT FUNCTION
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortField] || "";
    let valB = b[sortField] || "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // OPEN CREATE
  const openCreate = () => {
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
    setOpen(true);
  };

  // OPEN EDIT
  const openEdit = (branch) => {
    setSelectedBranch(branch);
    setForm({ ...branch });
    setEditMode(true);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await dispatch(updateBranch({ branchId: selectedBranch.branchId, data: form })).unwrap();
        showMessage("Branch updated successfully");
      } else {
        await dispatch(createBranch(form)).unwrap();
        showMessage("Branch created successfully");
      }
      setOpen(false);
    } catch {
      showMessage("Operation failed", "error");
    }
  };

  const removeBranch = async (id) => {
    try {
      await dispatch(deleteBranch(id)).unwrap();
      showMessage("Branch deleted successfully");
    } catch {
      showMessage("Failed to delete", "error");
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Branches</Typography>
        <Button variant="contained" onClick={openCreate}>
          + Create Branch
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search branches..."
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { field: "branchId", label: "ID" },
                { field: "bankId", label: "Bank ID" },
                { field: "branchCode", label: "Code" },
                { field: "branchName", label: "Name" },
                { field: "ifscCode", label: "IFSC" },
                { field: "address", label: "Address" },
                { field: "city", label: "City" },
                { field: "state", label: "State" },
                { field: "country", label: "Country" },
                { field: "createdAt", label: "Created" },
              ].map((col) => (
                <TableCell key={col.field} sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={sortField === col.field}
                    direction={sortOrder}
                    onClick={() => toggleSort(col.field)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.map((b) => (
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
                <TableCell>{b.createdAt?.split("T")[0]}</TableCell>

                <TableCell>
                  <IconButton onClick={() => openEdit(b)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeBranch(b.branchId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editMode ? "Edit Branch" : "Create Branch"}</DialogTitle>
        <DialogContent>
          {[
            "bankId",
            "branchCode",
            "branchName",
            "ifscCode",
            "address",
            "city",
            "state",
            "country",
          ].map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1")}
              margin="dense"
              fullWidth
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

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
