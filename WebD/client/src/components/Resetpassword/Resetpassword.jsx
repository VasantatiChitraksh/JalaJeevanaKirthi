import React from 'react'
import ReactDOM from "react-dom";
import {FaMailBulk,FaLock} from "react-icons/fa";
import { useState } from "react";
import Axios from "axios"
import styles from './ResetPassword.module.css';
import { Link,useNavigate,useParams } from "react-router-dom";

const Resetpassword = () => {

  const [password, setpassword] = useState("");
  const {token} = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("sucess")
   Axios.post('https://ug2-team3-se-webd-1.onrender.com/auth/reset-password/'+token,
       {password}).then(response => {
        console.log(password)
         if (response.data.status){
            console.log("sucess")
             navigate('/login')
         } 
         console.log(response.data)       
       } ).catch(err => {
         console.log(err)
       })
  }


  return (
    <div className={styles.container}>
      <div className={styles.Super}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Reset Password</h1>
          
          <div className={styles.input}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Set Password"
              required
              className={styles.inputField}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.button}>Reset</button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword



