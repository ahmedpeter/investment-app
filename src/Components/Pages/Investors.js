import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import API from '../../Util/API';
import { Link, useHistory } from "react-router-dom";
import { useLoading, Oval } from '@agney/react-loading';
import { format } from "date-fns";
// import numberFormat from "../../Util/CurrencyFormatter";
import BASE_URL from "../../Util/API";
// import { useParams, useLocation } from "react-router-dom";
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




function Investors() {

  
  const [allInvestors, setAllInvestors] = useState([]);
  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50"/>,
    loaderProps: {
      valueText: 'Please wait, loading records',
      style: {position:'absolute', left: '50%', top: '50%'}
    },
  });

  const history = useHistory();
  useEffect(() => {
    // set loading to true
    // fetchUserDetails();
    getAllInvestors();
    // paidInTotal();
    // console.log(location);
    
  }, []);

  const getAllInvestors = ()=> {
    axios.get(`${BASE_URL}/users`)
      .then((response) => {
        console.log(response);
        let users = response.data.results;
        users.map((user)=>{
            if(user.role == "user"){
                setAllInvestors(allInvestors => [...allInvestors, user] );
            }
        })
// setAllInvestors(response.data.results);
        // toast.success(response.data.message);
        
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  const handleClick = (id) => {
    history.push(`/app/account/${id}`)
    console.log(id);
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <div className="account__detail">
      <div className="d-flex">
      <h4 className="summary__title t-xl m-5em">All Investors</h4>
        {/* <button className="btn bg__green pull-right bold"> Create New Account </button> */}
      </div>
      <section className="summary al-base">
          <div className="header__info">
            <section className="row">
            {allInvestors === 0 && <p className="empty__record">Oops! There are no records yet...</p>}
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>S/N</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Telephone</TableCell>
                      <TableCell>Email </TableCell>
                      <TableCell> Role</TableCell>
                      <TableCell> Registered</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allInvestors?.map((investor, index) => {
                      return (
                        
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={() => handleClick(investor.id)}  key={investor.id} >
                          <TableCell></TableCell>
                          <TableCell>{index + 1 }</TableCell>
                          <TableCell>{capitalizeFirstLetter(investor?.first_name)}</TableCell>
                          <TableCell>{capitalizeFirstLetter(investor?.last_name)}</TableCell>
                          <TableCell>{investor?.phone_1}</TableCell>
                          <TableCell>{investor?.email}</TableCell>
                          <TableCell>{investor?.role ===  'user'? 'Investor': capitalizeFirstLetter(investor?.role)}</TableCell>
                          <TableCell> {format(new Date(investor?.created_at), "PP")} </TableCell>
                          
                          
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

export default Investors;
