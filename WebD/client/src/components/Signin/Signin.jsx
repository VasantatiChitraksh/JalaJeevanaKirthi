import React from "react";
import ReactDOM from "react-dom";
import {FaRegUserCircle,FaLock,FaMailBulk,} from "react-icons/fa";
import "./Signin.css";
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
   Axios.post('http://localhost:3001/auth/signup',
       {username , email, password}).then(response => {
         if (response.data.status){
            navigate('/login')
         }        
       } ).catch(err => {
         console.log(err)
       })
  }

  return (
    <div className="Super">
      <form action="" onSubmit={handleSubmit}>
        <h1>Sign in </h1>
        <div className="input">
          <FaRegUserCircle className="Icon" color="purple" />
          <input
            type="text"
            placeholder="UserName"
            required
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="input">
          <FaMailBulk className="Icon" color="purple" />
          <input
            type="E-mail"
            placeholder="e-mail"
            autoComplete="off"
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="input">
          <FaLock className="Icon" color="purple" />
          <input
            type="text"
            placeholder="Password"
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button type="submit">signup</button>
        <div>
          <p>
            already have an account ? <Link to="/login">login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
