import React from "react";
import ReactDOM from "react-dom";
import { FaRegUserCircle,FaLock } from "react-icons/fa";
import './signin.css';

function Signin () {
    return (
        <div className = 'Super'>
            <form action = "">
               <h1>Login Form</h1>
               <div className = 'input-box'>
                  <input type = 'text' placeholder='UserName' required />
                  <FaRegUserCircle className="Icon" />
               </div>
               <div className = 'input-box'>
                  <input type = 'text' placeholder='G-Mail' required />
                  <BiLogoGmail className="Icon" />
               </div>
               <div className = 'input-box'>
                  <input type = 'text' placeholder='Password' required />
                  <FaLock    className="Icon" />
               </div>
               <div className = 'input-box'>
                  <input type = 'text' placeholder='re-Enter Password' required />
                  <FaLock    className="Icon" />
               </div>
               
                  
               <div className="Rememeber-me">
                   <p>already have an account ? <a href="#">Login</a></p>
               </div>
               <button type ="submit">Signin</button> 
            </form>
         </div>

    );
}

export default Login