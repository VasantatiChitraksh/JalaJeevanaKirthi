import React from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    Axios.post('http://localhost:3001/auth/login', { email, password })
      .then((response) => {
        console.log('Response from server:', response.data);  // Log the entire response object
        if (response.data.status) {
          console.log('Login successful');  // This should log when login is successful
          navigate("/home");
        } else {
          console.log('Login failed:', response.data.message);  // Log any error messages
        }
      })
      .catch((err) => {
        console.error('Error during login request:', err);  // Catch any Axios errors
      });
  };
  

  return (
    <div className="Super">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input">
          <FaMailBulk className="Icon" color="wheat" />
          <input
            type="email"
            placeholder="e-mail"
            autoComplete="off"
            required
            id="email"          
            name="email"           
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <FaLock className="Icon" color="wheat" />
          <input
            type="password"
            placeholder="Password"
            required
            id="password"         
            name="password"       
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div>
        <Link to ='/forgotpassword'>forgotpassword?</Link>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
