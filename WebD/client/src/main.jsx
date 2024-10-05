import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Login.jsx'
import Signin from './Signin.jsx'
import { FaSignInAlt } from 'react-icons/fa'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Login />
  </StrictMode>,
)
