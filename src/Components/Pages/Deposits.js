import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useLoading, Oval } from "@agney/react-loading";
import { format } from "date-fns";
import numberFormat from "../../Util/CurrencyFormatter";
import BASE_URL from "../../Util/API";
import API from "../../Util/API";
import { useParams, useLocation } from "react-router-dom";
import { CLoadingButton } from "@coreui/react-pro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.scss";
import { RestorePageSharp } from "@material-ui/icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Deposits() {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [toaster, setToaster] = useState(false);
  const [loader, setLoader] = useState(true);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [allDeposits, setAllDeposits] = useState([]);
  const [allInvestors, setAllInvestors] = useState([]);
  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50" />,
    loaderProps: {
      valueText: "Please wait, loading records",
      style: { position: "absolute", left: "50%", top: "50%" },
    },
  });
  const history = useHistory();

  useEffect(() => {
    getAllInvestors();
  }, []);

  const getAllInvestors = () => {
    // let users = [];
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        console.log(response);
        response.data.results.map((user) => {
          if (user.investments.length > 0) {
            setAllDeposits((allDeposits) => [...allDeposits, user]);
          }
        });
        console.log(allDeposits);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleClick = (id) => {
    history.push(`/app/account/${id}`);
    console.log(id);
  };

  return (
    <div className="account__detail">
      <div className="d-flex">
        <h4 className="summary__title t-xl m-5em"> Customers Deposit</h4>
        {/* <button className="btn bg__green pull-right bold" name="newLoan" onClick={() => handleNewFormOpen()}> New Investment </button> */}
      </div>
      <section className="summary al-base">
        {/* <div className="summary__left w-70"> */}
        <div className="header__info">
          <section className="row">
            {allDeposits.length === 0 && !loader && (
              <p className="empty__record">Oops! No Deposits yet...</p>
            )}
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Investor</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Investment</TableCell>
                    {/* <TableCell>duration</TableCell> */}
                    <TableCell>Amount Due</TableCell>
                    <TableCell> Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allDeposits?.map((deposit) => {
                    return (
                      <TableRow
                        sx={{ "& > *": { borderBottom: "unset" } }}
                        key={deposit.id}
                        onClick={() => handleClick(deposit.id)}>
                        <TableCell></TableCell>
                        <TableCell className="title-case">
                          {/* {deposit?.ref_no}  */}
                          {deposit.first_name} {deposit.last_name}
                        </TableCell>
                        <TableCell>{deposit.email}</TableCell>
                        <TableCell>{deposit.phone_1}</TableCell>
                        <TableCell>{deposit.country}</TableCell>
                        <TableCell>
                          {numberFormat(
                            deposit.investments[deposit.investments.length - 1]
                              ?.amount
                          )}
                        </TableCell>
                        <TableCell>
                          {numberFormat(
                            deposit?.investments[deposit.investments.length - 1]
                              ?.amount *
                              0.3 +
                              deposit.investments[
                                deposit.investments.length - 1
                              ]?.amount
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(deposit.created_at), "PP")}
                        </TableCell>
                        <TableCell className="title-case">
                          {
                            deposit.investments[deposit.investments.length - 1]
                              ?.status
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </div>
      </section>

      {toaster && <ToastContainer />}
    </div>
  );
}

export default Deposits;
