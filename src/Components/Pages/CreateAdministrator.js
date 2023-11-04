import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useLoading, Oval } from '@agney/react-loading';
import { format } from "date-fns";
import BASE_URL from "../../Util/API";
import API from '../../Util/API';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Pages.scss";

function CreateAdministrator() {


    const adminDetails = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      };

      const [adminState, setAdminState] = useState(adminDetails);
      const { first_name, last_name, email, password } = adminState;
      const history = useHistory();

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminState({ ...adminState, [name]: value });
        
      };

      const handleCreateAdmin = (e) => {
        e.preventDefault();
        axios
          .post(`${BASE_URL}/admin/create`, {
            ...adminState,
          })
          .then((response) => {
            console.log(response);
            toast.success(response.data.message);
            history.push('/app/accounts/admins');
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      };


    return (
<form className="loan-form p-lg account__detail" onSubmit={handleCreateAdmin}>
            <h1 className="tab__title f-11">Create a New System User</h1>
            <section className="row m-t-xxl">
              <div className="form">
                <input
                  type="text"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="first_name"
                  onChange={handleInputChange}
                  value={first_name}
                  required
                />
                <label htmlFor="First Name" className="label-name">
                  <span className="content-name">First Name</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="text"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="last_name"
                  onChange={handleInputChange}
                  value={last_name}
                  required
                />
                <label htmlFor="Last Name" className="label-name">
                  <span className="content-name">Last Name</span>
                </label>
              </div>
            </section>
            <section className="row">
              <div className="form">
                <input
                  type="email"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  autoCapitalize="off"
                  name="email"
                  onChange={handleInputChange}
                  value={email}
                  required
                />
                <label htmlFor="Email" className="label-name">
                  <span className="content-name">Email</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="password"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="password"
                  onChange={handleInputChange}
                  value={password}
                />
                <label htmlFor="Set Password" className="label-name">
                  <span className="content-name">Set Password</span>
                </label>
              </div>
              <div className="form">
                <input
                  type="password"
                  className="page-form"
                  autoComplete="off"
                  placeholder=" "
                  name="confirm_password"
                //   onChange={handleInputChange}
                //   value={confirm_password}
                  required
                />
                <label htmlFor="Confirm Password" className="label-name">
                  <span className="content-name">Confirm Password</span>
                </label>
              </div>
            </section>

            <button type="submit" className="btn btn-primary pull-right">
              {" "}
              Create Administrator
            </button>
            {/* <button className="btn btn-secondary pull-right"> previous </button> */}
            { <ToastContainer/>}
          </form>


)
}

export default CreateAdministrator