// import React from 'react';
// import {useState} from "react";
// import { Link, useHistory } from 'react-router-dom';
// import MiniLoader from '../../Util/Loader';
// import API from '../../Util/API';
// import axios from 'axios';
// import logo from '../../Assets/imgs/Git-logo.png';
// import './auth.css'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {ErrorToaster} from '../../Util/Toaster'

// function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const history = useHistory();
//     const [toaster, setToaster] = useState(false);
//     const [msg, setMessage] = useState("");

//     const submitHandler = async (e) => {
//         const BASE_URL = 'https://dry-falls-41890.herokuapp.com/api/v1';
//         setLoading(true);
//         e.preventDefault();
//         if(!username || !password){
//             setMessage("Username/Password is a required field");
//             return false
//         }

//           axios
//       .post(`${BASE_URL}/login`, { username, password })
//       .then((response) => {
//         setLoading(false);
//         console.log(response);
//         const data = response.data;

//         axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

//         localStorage.setItem('accessToken', data.accessToken);
//         const storedToken = JSON.parse(localStorage.getItem("accessToken"));
//        const rs = axios.post(`${BASE_URL}/token`, {
//             refresh_token: storedToken.refreshToken,
//           })

//           const { token, user } = rs.data;
//           localStorage.setItem("token", JSON.stringify(token));
//             localStorage.setItem("user", JSON.stringify(user));
//         return;
//         localStorage.setItem('userInfo', JSON.stringify(response));

//       })
//       .catch((err) => {
//           console.log(err);
//           setMessage(`Oops! Something isn't right. Confirm
//           (a) Your Username/Password and
//           (b) Your Network connectivity`)
//         setLoading(false);
//       });

//     }
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MiniLoader from "../../Util/Loader";
import BASE_URL from "../../Util/API";
import API from "../../Util/API";
import axios from "axios";
import logo from "../../Assets/imgs/Git-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "./auth.css";
import { ErrorToaster } from "../../Util/Toaster";

function Login() {
  // const [state , dispatch] = useStateValue();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [toaster, setToaster] = useState(false);
  const [msg, setMessage] = useState("");
  const br = "<br/>";

  const submitHandler = async (e) => {
    console.log("hello");
    const BASE_URL = "https://investment-app-x8v6.onrender.com/api/v1";
    setLoading(true);
    e.preventDefault();
    if (!username || !password) {
      setMessage("Username/Password is a required field");
      return false;
    }

    axios
      .post(`${BASE_URL}/login`, { username, password })
      .then((response) => {
        setLoading(false);
        console.log(response);
        const {
          data: { accessToken },
        } = response;
        const data = response.data;

        if (response.status == 200) {
          localStorage.setItem("userInfo", JSON.stringify(response));
          history.push("/app/dashboard");
        }
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem("accessToken", accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

        localStorage.setItem("accessToken", data.accessToken);
        const storedToken = JSON.parse(localStorage.getItem("accessToken"));
        // localStorage.setItem('accessToken', data.accessToken);
        const rs = axios.post(`${BASE_URL}/token`, {
          refresh_token: storedToken.refreshToken,
        });

        const { token, user } = rs.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        return;
        //   .then((response) => {
        //     console.log(response);
        //     const { data } = response;
        //     localStorage.setItem('operator', JSON.stringify(data));
        //     console.log(data)
        //   });
      })
      .catch((err) => {
        console.log(err);
        setMessage(`Oops! Something isn't right. Confirm 
           (a) Your Username/Password and 
           (b) Your Network connectivity`);
        setLoading(false);
      });
  };

  function onEnter(e) {
    e.stopPropagation();
    if (e.key === "Enter") {
      submitHandler();
    }
  }

  return (
    <div className="login">
      <div className="login__badge">
        <div className="logo__section"></div>
      </div>
      <div className="login__section">
        <div className="login__container">
          <img src={logo} className="logo" alt="Logo" /> <br />
          <span className="sub-title">Login to Dividend Global</span>
          <form className="login__form" onSubmit={submitHandler}>
            <div className="form mb-lg mtb-10">
              <input
                type="email"
                className="page-form f-11"
                placeholder=" "
                value={username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username" className="label-name floating__label">
                <span className="content-name">Username/ID</span>
              </label>
            </div>
            <div className="form mtb-10">
              <input
                type="password"
                className="page-form f-11"
                placeholder=" "
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="label-name floating__label">
                <span className="content-name">Security</span>
              </label>
            </div>
            {msg && <p className="typical-error"> {msg}</p>}
            {success && <p className="typical-success">{msg}</p>}
            <Link to="/password-reset">
              <span className="sub-title t-right mt-md mb-lg">Forgotten?</span>
            </Link>
            <button type="submit" className="login-btn" disabled={loading}>
              {/* { loading && <MiniLoader/> } */}
              {!loading && <span>Login</span>}
              {loading && <span> Verifying...</span>}
            </button>
            <span className="sub-title">Don't have an account yet?</span>
            {/* <p className="label-name">Don't have an account yet?</p> */}
            <Link to="/account/investor/new">
              <button className="btn btn-secondary">Open Account </button>
            </Link>
          </form>
        </div>
      </div>

      <span className="sub-title copyright">
        Dividend Global! &copy; {new Date().getFullYear()}. All rights reserved
      </span>
      {toaster && <ToastContainer />}
    </div>
  );
}

export default Login;
