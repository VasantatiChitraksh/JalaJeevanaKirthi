import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import Login from './components/Login/Login.jsx'
import Signin from './components/Signin/Signin.jsx'
import { FaSignInAlt } from 'react-icons/fa'
import Chat from './chat/chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Signin />
  </StrictMode>,
)
