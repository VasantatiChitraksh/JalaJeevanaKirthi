import React from 'react'
import ReactDOM from "react-dom";
import {FaMailBulk,} from "react-icons/fa";
import styles from "./Forgotpassword.module.css";
import { useState } from "react";
import Axios from "axios"
import { Link,useNavigate } from "react-router-dom";

const Forgotpassword = () => {

  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault()
   //console.log("sucess")
   Axios.post('https://ug2-team3-se-webd-1.onrender.com/auth/forgot-password',
       {email}).then(response => {
         if (response.data.status){
            alert("check your email for reset password link")
            console.log("sucess")
            navigate('/login')
         }        
       } ).catch(err => {
         console.log(err)
       })
  }


  return (
    <div className={styles.container}>
      <div className={styles.Super}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Forgot Password</h1>
          
          <div className={styles.input}>
            <FaMailBulk className={styles.icon} />
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="off"
              required
              className={styles.inputField}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.button}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword



