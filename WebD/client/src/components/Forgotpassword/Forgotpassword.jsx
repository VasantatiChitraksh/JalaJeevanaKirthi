import React from 'react'
import ReactDOM from "react-dom";
import {FaMailBulk,} from "react-icons/fa";
import "./Forgotpassword.css";
import { useState } from "react";
import Axios from "axios"
import { Link,useNavigate } from "react-router-dom";

const Forgotpassword = () => {

  const [email, setemail] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("sucess")
   Axios.post('http://localhost:3001/auth/forgot-password',
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
    <div className="Super">
      <form action="" onSubmit={handleSubmit}>
        <h1>Forgot Password </h1>
        <div className="input">
          <FaMailBulk className="Icon" color="wheat"  />
          
          <input
            type="E-mail"
            placeholder="e-mail"
            autoComplete="off"
            required
            onChange={(e) => setemail(e.target.value)}
          />
          
        </div>
        <button type="submit" >Send</button>
      </form>
    </div>
  )
}

export default Forgotpassword



