import React from "react";
import ReactDOM from "react-dom";
import { FaRegUserCircle,FaLock } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import './Login.css';

function Login () {
    return (
        <div className = 'Super'>
            <form action = "">
               <h1>Login Form</h1>
               <div className = 'input-place'>
                  <input type = 'text' placeholder='G-Mail' required />
                  <BiLogoGmail className="Icon" />
               </div>
               <div className = 'input-place'>
                  <input type = 'text' placeholder='Password' required />
                  <FaLock    className="Icon" />
               </div>
               <div className="Remember-me"> 
                    <label><input type  = "checkbox"/> Rememebr me |</label>
                    <a href="#">Forget Password?</a>
               </div>
               <button type ="submit">Login</button>    
               <div className="signin link">
                   <p>Dont have an account ? <a href="#">Register</a></p>
               </div>
            </form>
         </div>

    );
}

export default Login;