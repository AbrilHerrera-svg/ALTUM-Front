// ============================================================
// main.tsx — PUNTO DE ENTRADA DE REACT
// Es el primer archivo que corre el navegador.
// Su único trabajo es "montar" la app de React dentro del HTML.
// ============================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';   // estilos globales de la app
import Aplicacion from './App'; // importamos el componente principal

// createRoot busca el elemento <div id="root"> en el index.html
// y le "inyecta" toda la app de React adentro.
// Sin este paso, React no aparecería en el navegador.
createRoot(document.getElementById('root')!).render(
  // StrictMode no cambia nada visual — solo activa advertencias extra
  // durante el desarrollo para ayudar a detectar errores.
  // El ! al final de getElementById le dice a TypeScript "confía en mí, existe"
  <StrictMode>
    <Aplicacion />
  </StrictMode>,
);
