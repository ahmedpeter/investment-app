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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Pages.scss";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};




function Administrators() {

  
  const [allAdmins, setAllAdmins] = useState([]);
  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50"/>,
    loaderProps: {
      valueText: 'Please wait, loading records',
      style: {position:'absolute', left: '50%', top: '50%'}
    },
  });

  useEffect(() => {
    // set loading to true
    // fetchUserDetails();
    getAllAdministrators();
    // paidInTotal();
    // location);
    
  }, []);

  const getAllAdministrators = ()=> {
      let tempAdmins = [];
    axios.get(`${BASE_URL}/users`)
      .then((response) => {
        response);
        let users = response.data.results;
        users.map((user)=>{
            if(user.role == "admin"){
                setAllAdmins(allAdmins => [...allAdmins, user] );
            }
        })
        
      })
      .catch((error) => {
        error);
        toast.error(error.message);
      });
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <div className="account__detail">
      <div className="d-flex">
      <h4 className="summary__title t-xl m-5em">System Administrators</h4>
        {/* <button className="btn bg__green pull-right bold"> Create New Account </button> */}
      </div>
      <section className="summary al-base">
          <div className="header__info">
            <section className="row">
              {allAdmins.length === 0  && <p className="empty__record">Oops! There are no records yet...</p>}
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>S/N</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email </TableCell>
                      <TableCell> Role</TableCell>
                      <TableCell> Registered</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allAdmins?.map((admin, index) => {
                      return (
                        
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }} key={admin.id}>
                          <TableCell></TableCell>
                          <TableCell>{index + 1 }</TableCell>
                          <TableCell>{capitalizeFirstLetter(admin?.first_name)}</TableCell>
                          <TableCell>{capitalizeFirstLetter(admin?.last_name)}</TableCell>
                          <TableCell>{admin?.email}</TableCell>
                          <TableCell>{capitalizeFirstLetter(admin?.role)}</TableCell>
                          <TableCell> {format(new Date(admin?.created_at), "PP")} </TableCell>
                          
                          
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </div>
        {/* </div> */}
        
      </section>
    </div>
  );
}

export default Administrators;
