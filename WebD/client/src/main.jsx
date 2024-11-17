import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../src/Homepage/home.jsx';
import './index.css';
import Login from './components/Login/Login.jsx';
import Signin from './components/Signin/Signin.jsx';
import Forum from './components/Forms/Forums.jsx';
import Chat from './components/chat/chat.jsx';
import Dataset from './components/Datasets/dataset.jsx';
import Bloghome from './components/Blogs/blogHome.jsx';
import PostPage from './components/Blogs/Postpage.jsx';
import { FaSignInAlt } from 'react-icons/fa';
import StoryGen from './ML/story_gen.jsx';
import WeatherPage from './Weather/weather.jsx';
import FishCatch from './Game/game.jsx'
import Forgotpassword from './components/Forgotpassword/Forgotpassword.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Resetpassword from './components/Resetpassword/Resetpassword.jsx';
import Quiz from './components/Quiz/quiz.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forums' element={<Forum />} />
        <Route path='/' element={  <Home/>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/resetpassword/:token' element={<Resetpassword/>}/>
        <Route path='/datasets' element={<Dataset/>}/>
        <Route path='/weather' element={<WeatherPage/>}/>
        <Route path='/roleplay' element={<StoryGen/>}/>
        <Route path='/blogs' element={<Bloghome/>}/>
        <Route path='/postPage' element={<PostPage/>}/>
        <Route path='/game'element={<FishCatch/>}/>
        <Route path='/quiz'element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);
