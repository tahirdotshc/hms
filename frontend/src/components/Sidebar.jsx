import React, { useState } from 'react';
import {
  List,
  ListItemText,
  Divider,
  Switch,
  ListItemIcon,
  Collapse,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar({ mode, setMode }) {
  const [open, setOpen] = useState(false);

  // Get role from localStorage (default: patient)
  const role =
    (JSON.parse(localStorage.getItem('auth') || 'null')?.user?.role) || 'patient';

  return (
    <div style={{ width: 260 }}>
      <List>
        {/* Home */}
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* DBA Dashboard */}
        <ListItemButton component={Link} to="/dba">
          <ListItemText primary="DBA Dashboard" />
        </ListItemButton>

        {/* DBA-only menu */}
        {role === 'dba' && (
          <>
            <Divider sx={{ my: 2 }} />

            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="System Controls" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open}>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="/dba/roles" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItemButton>

                <ListItemButton component={Link} to="/dba/audit-logs" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Audit Logs" />
                </ListItemButton>

                <ListItemButton component={Link} to="/dba/settings" sx={{ pl: 4 }}>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}
      </List>

      {/* Theme switcher */}
      <Divider sx={{ my: 2 }} />
      <div
        style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <span>Light</span>
        <Switch
          checked={mode === 'dark'}
          onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
        />
        <span>Dark</span>
      </div>
    </div>
  );
}
