import "./Authentication.css";
import myApi from "../../api/Api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const { data } = await myApi.post("/users/login", { email, password });
      data && localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("data", data);
      navigate(0);
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data.message);
    }
  };
  const createNewUser = async () => {
    try {
      const { data } = await myApi.post("/users/register", {
        name,
        email,
        password,
      });
      data && localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      navigate(0);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  };
  const userAlert = () => {
    alert(errorMessage);
    setErrorMessage("");
  };

  return (
    <div className="authenticationPage">
      {errorMessage && userAlert()}
      <div className="signIn">
        <div className="heder">Log In</div>
        <div className="inputsDiv">
          <div className="emailPassword">Email</div>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="emailPassword">Password</div>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="input btn" type="button" onClick={loginUser}>
          Submit
        </button>
      </div>
      <div className="signIn">
        <div className="heder">Create Account</div>
        <div className="inputsDiv">
          <div className="emailPassword">Name</div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="emailPassword">Email</div>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="emailPassword">Password</div>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="input btn" type="button" onClick={createNewUser}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Authentication;
