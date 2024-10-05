import React from "react";
import ReactDOM from "react-dom";
import { FaRegUserCircle,FaLock } from "react-icons/fa";
import './signin.css';

const Signin = () => {
    return (
        <div className = 'Super'>
            <form action = "">
               <h1>Login Form</h1>
               <div className = 'input'>
                  <input type = 'text' placeholder='UserName' required />
                  <FaRegUserCircle className="Icon" />
               </div>
               <div className = 'input'>
                  <input type = 'text' placeholder='Password' required />
                  <FaLock    className="Icon" />
               </div>
               <div className = 'input'>
                  <input type = 'text' placeholder='re-Enter Password' required />
                  <FaLock    className="Icon" />
               </div>
               
               <button type ="submit">Signin</button>    
               <div>
                   <p>already have an account ? <a href="#">Login</a></p>
               </div>
            </form>
         </div>

    );
};

export default Login