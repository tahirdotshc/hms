import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dba/users">
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={Link} to="/dba/roles">
          <ListItemText primary="Manage Roles" />
        </ListItem>
        <ListItem button component={Link} to="/dba/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}
