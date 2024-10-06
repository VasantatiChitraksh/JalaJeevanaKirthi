import React from "react";
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import './Login.css';

function Login() {
    return (
        <div className='Super'>
            <form action="">
                <h1>Login Form</h1>
                <div className='input'>
                    <input type='text' placeholder='Username' required />
                    <FaRegUserCircle className="Icon" />
                </div>
                <div className='input'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className="Icon" />
                </div>
                <div className="Remember-me">
                    <label><input type="checkbox" /> Remember me </label>
                    <a href="#">Forget Password?</a>
                </div>
                <button type="submit">Login</button>
                <div>
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
