import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import GraphInfo from "../widgets/GraphInfo";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthContext from "../../Util/AuthContext";
import numberFormat from "../../Util/CurrencyFormatter";
import API from "../../Util/API";
import { parse, format, addMonths, formatDistance, subDays } from "date-fns";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BASE_URL from "../../Util/API";
import axiosInstance from "../../Util/axiosInstance";

import "./dashboard.css";
import CryptoCarousel from "../widgets/Carousel";
import CoinsTable from "../widgets/CoinsTable";

function Dashboard() {
  const history = useHistory();

  const [investors, setInvestors] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [totalNoOfDeposit, setTotalNoOfDeposit] = useState(0);
  const [totalNoOfWithdrawals, setTotalNoOfWithdrawals] = useState(0);
  const [topEarners, setTopEarners] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [disbursed, setDisbursed] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getAllInvestors();
    getUserInfo();
    return () => {
      setInvestors([]);
      setDisbursed([]);
      setWithdrawals([]);
      setSystemUsers([]);
      setTotalNoOfDeposit(0);
      setTotalNoOfWithdrawals(0);
      setTopEarners([]);
    };
  }, []);

  const getAllInvestors = async () => {
    let tempArr = [];
    let tempWithdrawal = [];
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        // response.data);
        filterAdmins(response.data.results);
        setSystemUsers(response.data.results);
        response.data.results.map((user) => {
          user.investments.map((investment) => {
            tempArr.push(investment);
            setTotalNoOfDeposit(tempArr.length);
            let totalDisbursed = tempArr.reduce(
              (total, currentValue) => (total = total + currentValue.amount),
              0
            );

            setDisbursed(totalDisbursed);
            //
          });
          user.withdrawals.map((withdrawal) => {
            tempWithdrawal.push(withdrawal);
            // tempWithdrawal);
            setTotalNoOfWithdrawals(tempWithdrawal.length);
            let totalWithdrawals = tempWithdrawal.reduce(
              (total, currentValue) => (total = total + currentValue.amount),
              0
            );
            // totalWithdrawals);
            setWithdrawals(totalWithdrawals);
          });
        });
      })
      .catch((error) => {
        error);
        // toast.error(error.message);
      });
  };

  const requestForCurrentUserData = async (id) => {
    await axios
      .get(`${BASE_URL}/user/${id}`)
      .then((response) => {
        // response);
        // Upload a Profile photo to continue
        setUserData(response.data.results);
      })
      .catch((error) => {
        error);
        // toast.error(error.message);
      });
  };

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const base64Url = user.data.accessToken.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    // JSON.parse(window.atob(base64)));
    setLoggedInUser(JSON.parse(window.atob(base64)));
    let userId = JSON.parse(window.atob(base64)).id;
    requestForCurrentUserData(userId);
  };

  const filterAdmins = (arr) => {
    arr.map((user) => {
      if (user?.role === "user") {
        setInvestors((investors) => [...investors, user]);
        if (user.investments.length > 0) {
          setTopEarners((topEarners) => [...topEarners, user]);
        }
      }
      return null;
    });
    // investors);
  };

  // const handleClick = (loggedInUser)=>{
  //     history.push(`/app/account/${loggedInUser}`);
  // }
  const handleClick = (userID) => {
    history.push(`/app/account/${userID}`);
  };
  return (
    <div className="main-content">
      <h4 className="summary__title t-xl title-case">
        {" "}
        Hello {userData.first_name}!{" "}
      </h4>
      <p class="text-muted text-14">
        Take a peep on what's happening around your investments
      </p>

      {loggedInUser.role === "user" && (
        <>
          {/* <button type="submit" className="btn ml-0" >New Deposit</button> */}
          <section class="card__holder p-4">
            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">ND</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">No. of Deposits </p>
                <h3 class="text-primal card__value">
                  {userData?.investments?.length}{" "}
                </h3>{" "}
              </div>
            </div>

            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">TD</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Deposits</p>
                <h3 class="text-primal card__value">
                  {userData?.investments?.length !== 0
                    ? numberFormat(
                        userData?.investments?.reduce(
                          (total, currentValue) =>
                            (total = total + currentValue.amount),
                          0
                        )
                      )
                    : 0}
                </h3>
              </div>
            </div>

            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">TW</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Withdrawal</p>
                <h3 class="text-primal card__value">
                  {userData?.withdrawals?.length !== 0
                    ? numberFormat(
                        userData?.withdrawals?.reduce(
                          (total, currentValue) =>
                            (total = total + currentValue.amount),
                          0
                        )
                      )
                    : 0}
                </h3>
              </div>
            </div>

            <div
              class="card"
              style={{ backgroundColor: "#00cc99", color: "white" }}>
              <div class="card__icon">
                <span class="table-usr-circle cream">TWB</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Wallet Balance</p>
                <h3 class="text-primal card__value">
                  {userData.investments?.length !== 0
                    ? numberFormat(
                        userData.investments?.reduce(
                          (total, currentValue) =>
                            (total = total + currentValue.balance),
                          0
                        )
                      )
                    : 0}
                </h3>{" "}
              </div>
            </div>
          </section>
        </>
      )}

      {loggedInUser?.role === "admin" && (
        <>
          <section class="card__holder p-4">
            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">TI</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Investors </p>
                <h3 class="text-primal card__value">
                  {investors?.length}{" "}
                </h3>{" "}
              </div>
            </div>

            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">TD</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Deposits</p>
                <h3 class="text-primal card__value"> {totalNoOfDeposit} </h3>
              </div>
            </div>

            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">NW</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">No. of Withdrawal</p>
                <h3 class="text-primal card__value">{totalNoOfWithdrawals}</h3>
              </div>
            </div>
            <div class="card">
              <div class="card__icon">
                <span class="table-usr-circle berry">TW</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Withdrawal</p>
                <h3 class="text-primal card__value">
                  {numberFormat(withdrawals)}
                </h3>
              </div>
            </div>

            <div
              class="card"
              style={{ backgroundColor: "#00cc99", color: "white" }}>
              <div class="card__icon">
                <span class="table-usr-circle cream">TD</span>
              </div>
              <div class="card__desc">
                <p class="text-muted text-14">Total Deposits</p>
                <h3 class="text-primal card__value">
                  {" "}
                  {numberFormat(disbursed)}{" "}
                </h3>{" "}
              </div>
            </div>
          </section>

          <div className="graphstat">
            <GraphInfo />
          </div>

          <h4 className="summary__title t-xl title-case m-l-4">
            {" "}
            This Month Top Earners{" "}
          </h4>
          <section className="row">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className="rotate">S/N</TableCell>
                    <TableCell className="rotate">Investor</TableCell>
                    <TableCell className="rotate">Deposited</TableCell>
                    <TableCell className="rotate">Take Home</TableCell>
                    <TableCell className="rotate">Withdrawn</TableCell>
                    <TableCell className="rotate">Balance</TableCell>
                    <TableCell className="rotate">Status</TableCell>
                  </TableRow>
                </TableHead>
                {/* {loader && <div className=""> {indicatorEl} </div>} */}
                {topEarners.length === 0 && (
                  <p className="no__loans">Oops! There are no records yet</p>
                )}
                <TableBody>
                  {topEarners?.map((user, index) => {
                    return (
                      <TableRow
                        sx={{ "& > *": { borderBottom: "unset" } }}
                        onClick={() => handleClick(user?.id)}
                        key={index}>
                        <TableCell></TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="upper-case">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {user?.first_name} {user?.last_name}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {numberFormat(
                            user.investments[user.investments.length - 1]
                              ?.amount
                          )}
                        </TableCell>
                        <TableCell>
                          {numberFormat(
                            user?.investments[user.investments.length - 1]
                              ?.amount *
                              0.3 +
                              user.investments[user.investments.length - 1]
                                ?.amount
                          )}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {user.withdrawals.length !== 0
                            ? numberFormat(
                                user.withdrawals[user.withdrawals.length - 1]
                                  ?.amount
                              )
                            : 0}{" "}
                        </TableCell>
                        {/* <TableCell>{numberFormat(((user?.investments[user.investments.length - 1]?.amount * 0.3) + user.investments[user.investments.length - 1]?.amount)) - 0}</TableCell> */}
                        <TableCell>
                          {
                            // numberFormat(user?.investments[user.investments.length - 1]?.balance)
                            numberFormat(
                              user?.investments[user.investments.length - 1]
                                ?.amount *
                                0.3 +
                                user.investments[user.investments.length - 1]
                                  ?.amount -
                                (user.withdrawals.length !== 0
                                  ? user.withdrawals[
                                      user.withdrawals.length - 1
                                    ]?.amount
                                  : 0)
                            )
                          }
                        </TableCell>
                        {/* <TableCell>{user.investments[user.investments.length - 1]?.created_at ? addMonths(new Date(user.investments[user.investments.length - 1]?.created_at), 6).toString() : 'N/A'} </TableCell> */}
                        <TableCell
                          className={
                            user.investments[user.investments.length - 1]
                              ?.status === "open" ||
                            user.investments[user.investments.length - 1]
                              ?.status === "pending"
                              ? "red"
                              : "green"
                          }>
                          {user.investments[user.investments.length - 1]
                            ?.status == "pending" ||
                          user.investments[user.investments.length - 1]
                            ?.status === "open"
                            ? "Minning"
                            : "Cashed Out"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </>
      )}

      {/* Current User Data */}
      {loggedInUser.role === "user" && (
        <>
          <h4 className="summary__title t-xl title-case m-l-4">
            {" "}
            Your Deposits/Investments{" "}
          </h4>
          <section className="row">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className="rotate">S/N</TableCell>
                    <TableCell className="rotate">Ref</TableCell>
                    <TableCell className="rotate">Deposit</TableCell>
                    <TableCell className="rotate">Plan</TableCell>
                    <TableCell className="rotate">Take Home</TableCell>
                    <TableCell className="rotate">Withdrawn</TableCell>
                    <TableCell className="rotate">Balance</TableCell>
                    <TableCell className="rotate">Date</TableCell>
                    <TableCell className="rotate">Status</TableCell>
                  </TableRow>
                </TableHead>
                {/* {loader && <div className=""> {indicatorEl} </div>} */}
                {userData?.investments?.length === 0 && (
                  <p className="no__loans">
                    Oops! you've not made any deposits yet!
                  </p>
                )}
                <TableBody>
                  {userData?.investments?.map((investment, index) => {
                    return (
                      <TableRow
                        sx={{ "& > *": { borderBottom: "unset" } }}
                        onClick={() => handleClick(userData.id)}
                        key={index}>
                        <TableCell></TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="upper-case">
                          {index + 1}
                        </TableCell>
                        <TableCell> {investment.ref_no}</TableCell>
                        <TableCell>
                          {" "}
                          {numberFormat(investment.amount)}
                        </TableCell>
                        <TableCell> {investment.plan}</TableCell>
                        <TableCell>
                          {" "}
                          {numberFormat(investment.balance)}
                        </TableCell>
                        <TableCell> {numberFormat(0)}</TableCell>
                        <TableCell>{numberFormat(0)}</TableCell>
                        <TableCell>
                          {format(new Date(investment?.created_at), "PP")}
                        </TableCell>
                        <TableCell
                          className={
                            investment.status === "pending" ||
                            investment.status === "declined"
                              ? "red title-case"
                              : "green title-case"
                          }>
                          {" "}
                          {investment.status}
                        </TableCell>
                        {/* <TableCell className={user.investments[user.investments.length - 1]?.status === "open" || user.investments[user.investments.length - 1]?.status === "pending" ? "red" : "green" }>{user.investments[user.investments.length - 1]?.status == 'pending' || user.investments[user.investments.length - 1]?.status === "open" ? 'Minning' : 'Cashed Out' }</TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          {/* <Link > */}

          <div
            className="float__action launcher-button"
            onClick={() => handleClick(userData.id)}>
            Make a deposit <IconButton> + </IconButton>
          </div>

          {/* </Link> */}
        </>
      )}
      <CryptoCarousel />
      <CoinsTable />
    </div>
  );
}

export default Dashboard;
