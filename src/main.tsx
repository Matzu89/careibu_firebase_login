import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

import App from './App.tsx'
import { AuthProvider } from './context/auth.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)