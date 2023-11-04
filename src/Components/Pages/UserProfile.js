import React, {useEffect, useState} from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import {Avatar, IconButton} from '@material-ui/core';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import BASE_URL from "../../Util/API";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import './Pages.scss';

function Profile() {
  const [user, setUser] = useState([]);
  const [id, setId] = useState();
 
  const history = useHistory();
  const userDetails = {
    wallet_type: "",
    wallet_info: ""
  };
 const [userProfile, setUserProfile] = useState(userDetails);
const { wallet_type, wallet_info } = userProfile;
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };


    useEffect(() => {
        getUserInfo();
        
    },[])

    const submitHandler = async (e) => {
      // setLoading(true);
      e.preventDefault();
      axios.put(`${BASE_URL}/user/profile/${id}`, {
        ...userProfile
      } )
    .then((response) => {
      // setLoading(false);
      response);
    })
    .catch((err) => {
        err);
        // setLoading(false);
    });

  }


      const getUserInfo =()=>{
        const userInfo = localStorage.getItem('userInfo');
        const user = JSON.parse(userInfo);
        const base64Url = user.data.accessToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        let userId = JSON.parse(window.atob(base64)).id;
        JSON.parse(window.atob(base64)))
        userId);
        history.push(`/app/profile/${userId}`)
        requestForCurrentUserData(userId);
        setId(userId)
      }


      const requestForCurrentUserData = async (id)=> {
        await axios.get(`${BASE_URL}/user/${id}`)
          .then((response) => {
            response);
            setUser(response.data.results)
          })
          .catch((error) => {
            error);
            toast.error(error.message);
          });
      }

 
     


    return (
    <div className="main-content">
        <section className="row page__header">
            <h1 className="tab__title ml-l-5">Manage Profile</h1>
            <span className="headsup__info"> (All fields marked with <span className="bold"> asterisks </span>  are required)</span> 
        </section>

      <form className="loan-form p-lg" onSubmit={submitHandler}>
            <h1 className="tab__title f-11">Personal Information</h1>
            <section className="row">
              <div className="form">
                <input
                  type="text"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="first_name"
                  disabled
                  value={user.first_name}
                  required
                />
                <label htmlFor="First Name" className="label-name">
                  <span className="content-name required">First Name</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="text"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  disabled
                  value={user.last_name}
                  name="last_name"
                  required
                />
                <label htmlFor="last_name" className="label-name">
                  <span className="content-name required">Last Name</span>
                </label>
              </div>
              <div className="form">
               
              </div>
            </section>
            <section className="row">
            <div className="form">
                <input
                  type="email"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  disabled
                  value={user.email}
                />
                <label htmlFor="email" className="label-name">
                  <span className="content-name">Email</span>
                </label>
              </div>

              <div className="form">
                <input
                  type="state_of_residence"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  disabled
                  value={user.phone_1}
                />
                <label htmlFor="state_of_residence" className="label-name">
                  <span className="content-name">Primary Telephone</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="state_of_residence"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  disabled
                  value={user.country}
                />
                <label htmlFor="state_of_residence" className="label-name">
                  <span className="content-name">Country</span>
                </label>
              </div>
            </section>

            <section className="row">
              <div className="form">
                <input
                  type="password"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="current_password"
                  // value={current_password}
                  required
                />
                <label htmlFor="First Name" className="label-name">
                  <span className="content-name required">Current Password</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="password"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  // value={new_password}
                  name="new_password"
                  required
                />
                <label htmlFor="new_password" className="label-name">
                  <span className="content-name required">New Password</span>
                </label>
              </div>
              <div className="form">
               
              </div>
            </section>
            <h1 className="tab__title f-11">Wallet Information</h1>
            <section className="row">
              <div className="form">
                <FormControl variant="standard">
                  <Select
                    labelId=""
                    id=""
                    label="Wallet Type"
                    name="wallet_type"
                    onChange={handleInputChange} 
                    value={user.wallet_type}
                    color="success"
                  >
                    <MenuItem value="">
                      <em>Select Wallet Type</em>
                    </MenuItem>
                        <MenuItem value="BitCoin"> BitCoin </MenuItem>
                        <MenuItem value="BitCoin 1"> BitCoin </MenuItem>
                        <MenuItem value="BitCoin 2"> BitCoin </MenuItem>
                        <MenuItem value="BitCoin 3"> BitCoin </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="form">
                <input
                  type="text"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  onChange={handleInputChange} 
                  value={user.wallet_info}
                  name="wallet_address"
                  required
                />
                <label htmlFor="wallet_address" className="label-name">
                  <span className="content-name required">Wallet Address</span>
                </label>
              </div>
              <button type="submit" className="btn ml-0">Update Wallet </button>
                    <button className="btn bg__green">Save Password</button>
              
            </section>
            </form>
        </div>
    )
}

export default Profile
