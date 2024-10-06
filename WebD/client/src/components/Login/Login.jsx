import React from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import  Axios  from "axios";
import { useState } from "react";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/auth/login", { email, password })
      .then((response) => {
        if (response.data.status) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
      <div className="Super">
        <form action=""  onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button type="submit">Login</button>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to ="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    );
  };

export default Login;
