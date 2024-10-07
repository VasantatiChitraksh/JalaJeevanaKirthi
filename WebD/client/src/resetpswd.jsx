import React from "react";
import ReactDOM from "react-dom";
import { FaLock } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import './resetpswd.css';

function Login () {
    return (
        <div className = 'Super'>
            <form action = "">
               
               <h1>Change Password</h1>
               <div className = 'input-place'>
                  <input type = 'email' placeholder='G-Mail' required />
                  <BiLogoGmail className="Icon" />
               </div>
               <div className = 'input-place'>
                  <input type = 'password' placeholder='New Password' required />
                  <FaLock    className="Icon" />
               </div>
               <div className = 'input-place'>
                  <input type = 'password' placeholder='re-enter NewPassword' required />
                  <FaLock    className="Icon" />
               </div>
               <button type ="submit">Reset</button>    
              
            </form>
         </div>

    );
}

export default Login;