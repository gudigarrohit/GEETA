import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";  // ✅ important
import { SongProvider } from "./context/SongContext";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SongProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SongProvider>

  </StrictMode>,
)
