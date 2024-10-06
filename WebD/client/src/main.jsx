import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Login.jsx'
import Signin from './Sign in.jsx'
import { FaSignInAlt } from 'react-icons/fa'
import Chat from './chat/chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chat />
  </StrictMode>,
)
