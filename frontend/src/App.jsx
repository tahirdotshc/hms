import React, { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  useEffect(() => localStorage.setItem('themeMode', mode), [mode]);
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex' }}>
        {/* Only show sidebar if not on landing page */}
        {!isLanding && <Sidebar mode={mode} setMode={setMode} />}
        <main style={{ flexGrow: 1, padding: isLanding ? 0 : 20 }}>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard routes with sidebar */}
            
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}
