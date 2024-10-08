import React from 'react'
import ReactDOM from "react-dom";
import {FaMailBulk,FaLock} from "react-icons/fa";
import { useState } from "react";
import Axios from "axios"
import { Link,useNavigate,useParams } from "react-router-dom";

const Resetpassword = () => {

  const [password, setpassword] = useState("");
  const {token} = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("sucess")
   Axios.post('http://localhost:3001/auth/reset-password/'+token,
       {password}).then(response => {
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
    <div className="Super">
      <form action="" onSubmit={handleSubmit}>
        <h1>Reset password </h1>
        <div className="input">
          <FaLock className="Icon" color="wheat" />
          <input
            type="password"
            placeholder=" set Password"
            required
            id="password"         
            name="password"       
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset</button>
      </form>
    </div>
  )
}

export default Resetpassword



