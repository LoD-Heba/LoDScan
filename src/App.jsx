import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Solo necesitas importar Router aquí
import { AppRoutes } from "./routes/index"; // Asegúrate de que esta ruta sea correcta

export default function App() {
  return (
    <Router> 
      <AppRoutes />
    </Router>
  );
}
