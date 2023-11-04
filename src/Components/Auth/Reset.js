import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../Assets/imgs/logo.svg';
import './auth.css'

function Reset() {
    return (
        <div className="login">
           <div className="login__container">
               <div className="logo__section">
                   {/* <img src={logo} className="logo" alt="Logo" /> <br/> */}
                    <h1 className="title">Pay Bills! </h1> 
                    <span className="sub-title">enter the email address you signed up with and we will send you details on how to reset your password</span>
               </div>
               <form>
               <div className="form">
                        <input type="text" className="page-form text-white" autoComplete="off" placeholder=" " required/>
                        <label for="username" className="label-name floating__label"> 
                            <span className="content-name text-white">Username</span>
                        </label>
                    </div>
                
                    <Link to="/">
                    <span className="sub-title t-right mt-md mb-lg">suddenly remember it?</span>
                </Link>
                <button className="login-btn"> reset my password</button>
                </form>
           </div>
           <span className="sub-title copyright">Pay Bills! &copy; 2022. All rights reserved</span>

        </div>
    )
}

export default Reset
