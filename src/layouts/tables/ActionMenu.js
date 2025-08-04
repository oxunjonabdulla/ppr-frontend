import React, { useState } from "react";
import {
  Icon,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";

const ActionMenu = ({ onView, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Icon
        sx={{ cursor: "pointer", fontWeight: "bold", color: "#555" }}
        fontSize="small"
        onClick={handleOpen}
      >
        more_vert
      </Icon>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onView();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" sx={{ color: "#0288d1" }} />
          </ListItemIcon>
          <ListItemText primary="Ko‘rish" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: "#1976d2" }} />
          </ListItemIcon>
          <ListItemText primary="Tahrirlash" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "#d32f2f" }} />
          </ListItemIcon>
          <ListItemText primary="O‘chirish" />
        </MenuItem>
      </Menu>
    </>
  );
};

ActionMenu.propTypes = {
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionMenu;
