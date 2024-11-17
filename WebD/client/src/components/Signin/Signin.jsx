import React from "react";
import ReactDOM from "react-dom";
import {FaRegUserCircle,FaLock,FaMailBulk,} from "react-icons/fa";
import styles from "./Signin.module.css";
import { useState } from "react";
import Axios from "axios"
import { Link,useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("sucess")
   Axios.post('https://ug2-team3-se-webd-1.onrender.com/auth/signup',
       {username , email, password}).then(response => {
         if (response.data.status){
            console.log("sucess")
            localStorage.setItem('userEmail', email);
            localStorage.setItem('loginFlag', 1);
            navigate('/')
         } else {
          console.log('signup failed:', response.data.message);  // Log any error messages
        }        
       } ).catch(err => {
        console.error('Error during login request:', err);
       })
  }

  return (
    <div className={styles.container}>
    <div className={styles.Super}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Sign In</h1>
        
        <div className={styles.input}>
          <FaRegUserCircle className={styles.icon} />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
            className={styles.inputField}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        
        <div className={styles.input}>
          <FaMailBulk className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            autoComplete="off"
            required
            className={styles.inputField}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        
        <div className={styles.input}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            className={styles.inputField}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className={styles.button}>Sign Up</button>
        
        <div className={styles.links}>
          <p>
            Already have an account? <Link to="/login" className={styles.link}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Signin;
