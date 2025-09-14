import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Initial cards
  const [cards, setCards] = useState([
    { title: "Manage Roles", description: "Assign and update user roles", path: "/admin/roles" },
    { title: "Users", description: "View and manage users", path: "/admin/users" },
    { title: "Settings", description: "Application settings", path: "/admin/settings" },
  ]);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [newCard, setNewCard] = useState({ title: "", description: "", path: "" });

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ title: "", description: "", path: "" });
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            + Add Card
          </Button>
        </Box>

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => navigate(card.path)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Card Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              fullWidth
              value={newCard.title}
              onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={newCard.description}
              onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Path"
              fullWidth
              value={newCard.path}
              onChange={(e) => setNewCard({ ...newCard, path: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCard} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
