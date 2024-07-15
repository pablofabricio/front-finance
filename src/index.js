import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import { AuthProvider } from './context/AuthContext';

// Definir um tema personalizado escuro
const theme = createTheme({
  palette: {
    mode: 'dark', // Modo escuro
    primary: {
      main: '#1976d2', // Cor principal
    },
    secondary: {
      main: '#dc004e', // Cor secundária
    },
    background: {
      default: '#303030', // Fundo padrão mais escuro
      paper: '#424242', // Cor do papel (cards, etc.)
    },
    text: {
      primary: '#ffffff', // Cor do texto principal (branco)
      secondary: '#cccccc', // Cor do texto secundário (cinza claro)
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplicar o CssBaseline para normalizar estilos */}
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

ReactDOM.render(<App />, document.getElementById('root'));
