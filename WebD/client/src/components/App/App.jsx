import { useState } from 'react'
import './App.css'
import Login from '../Login/Login.jsx'
import Signin from '../Signin/Signin.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element= {<Signin/>}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}
export default App
