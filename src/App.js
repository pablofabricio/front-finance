import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import { AuthProvider } from './context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Definindo um tema escuro personalizado
const theme = createTheme({
  palette: {
    mode: 'dark', // Modo escuro
    background: {
      default: '#303030', // Cor de fundo padrão
      paper: '#424242', // Cor de fundo para papel (para barras laterais, caixas, etc.)
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza estilos e aplica o tema escuro */}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/home" element={<HomeView />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
