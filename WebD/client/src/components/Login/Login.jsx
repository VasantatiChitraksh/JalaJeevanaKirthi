import React from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from './Login.module.css';
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    Axios.post('https://ug2-team3-se-webd-1.onrender.com/auth/login', { email, password })
      .then((response) => {
        console.log('Response from server:', response.data);  // Log the entire response object
        if (response.data.status) {
          console.log('Login successful');  // This should log when login is successful
          localStorage.setItem('userEmail', email);
          localStorage.setItem('loginFlag', 1);
          navigate("/");
        } else {
          alert("Invalid EmailID or Password" )
          console.log('Login failed:', response.data.message);  // Log any error messages
        }
      })
      .catch((err) => {
        console.error('Error during login request:', err);  // Catch any Axios errors
      });
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.Super}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Login</h1>
          
          <div className={styles.input}>
            <FaMailBulk className={styles.icon} />
            <input
              type="email"
              placeholder="e-mail"
              autoComplete="off"
              required
              className={styles.inputField}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.input}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              required
              className={styles.inputField}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.button}>Login</button>
          
          <div className={styles.links}>
            <Link to="/forgotpassword" className={styles.link}>Forgot Password?</Link>
            <p>
              Don't have an account? <Link to="/signup" className={styles.link}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
