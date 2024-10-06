import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import Login from './components/Login/Login.jsx'
import Signin from './components/Signin/Signin.jsx'
import Chat from './components/chat/chat.jsx'
import { FaSignInAlt } from 'react-icons/fa'
import StoryGen from './ML/story_gen.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  </StrictMode>,
)
