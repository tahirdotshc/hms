import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Initially empty until Admin assigns modules
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // 🔑 Later: fetch assigned patient modules/cards from backend
    // fetch("/api/patient/cards", { headers: { Authorization: token } })
    //   .then(res => res.json())
    //   .then(data => setCards(data));

    setCards([]); // default: empty
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar will remain empty until Admin assigns something */}
      <Sidebar links={[]} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" mb={3}>
          Patient Dashboard
        </Typography>

        {cards.length === 0 ? (
          <Typography color="text.secondary">
            No modules assigned yet. Please contact Admin.
          </Typography>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};

export default PatientDashboard;
