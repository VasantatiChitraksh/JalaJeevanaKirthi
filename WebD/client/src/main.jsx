import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../src/Homepage/home.jsx';
import './index.css';
import Login from './components/Login/Login.jsx';
import Signin from './components/Signin/Signin.jsx';
import Chat from './components/chat/chat.jsx';
import { FaSignInAlt } from 'react-icons/fa';
import StoryGen from './ML/story_gen.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes instead of Router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* Use Routes for defining multiple Route paths */}
        <Route path='/signup' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={  <Home/>} />
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);