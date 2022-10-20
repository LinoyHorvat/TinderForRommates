import "./Authentication.css";
import myApi from "../../api/Api";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

//TODO: add alerts/ errors to UI when adding incorrect data
// TODO: fix redirect app

function Authentication() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    try {
      const { data } = await myApi.post("/users/login", { email, password });
      data && localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("data", data);
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data);
    }
    setRedirect(true);
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
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data.message);
      setErrorMessage(err.response.data);
    }
  };
  const userAlert = () => {
    alert(errorMessage);
    setErrorMessage("");
  };

  return (
    <div className="authenticationPage">
      {errorMessage && userAlert()}
      {isRedirect && <Navigate to="/" />}
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

// {isRedirect && <Redirect to="/" />}
// import { Redirect } from "react-router-dom";
