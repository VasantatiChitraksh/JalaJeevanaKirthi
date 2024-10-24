import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../src/Homepage/home.jsx';
import './index.css';
import Login from './components/Login/Login.jsx';
import Signin from './components/Signin/Signin.jsx';
import Chat from './components/chat/chat.jsx';
import { FaSignInAlt } from 'react-icons/fa';
import StoryGen from './ML/story_gen.jsx';
import WeatherPage from './Weather/weather.jsx';
import Forgotpassword from './components/Forgotpassword/Forgotpassword.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Resetpassword from './components/Resetpassword/Resetpassword.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={  <Home/>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/resetpassword/:token' element={<Resetpassword/>}/>
        <Route path='/weather' element={<WeatherPage/>}/>
        <Route path='/roleplay' element={<StoryGen/>}/>
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);
