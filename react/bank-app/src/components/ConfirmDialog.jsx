import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmDialog({ open, title = "Confirm", message = "Are you sure?", onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button color="error" variant="contained" onClick={() => { onConfirm(); onClose(false); }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
    